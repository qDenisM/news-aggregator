#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/67fb7606fa24a150aba5fa66de635a902d61bcaf7350cc1ca2943bff7cca1141/contract';
import endContract from '../../snapshots/67fb7606fa24a150aba5fa66de635a902d61bcaf7350cc1ca2943bff7cca1141/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'ARTICLES',
        columns: [
          col('author', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('category_id', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('content', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('image_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('published_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('source_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PUBLISHED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'ARTICLES_status_check_bc64f66b',
            sql`"status" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'ARTICLE_TAGS',
        columns: [
          col('article_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('assigned_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('tag_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['article_id', 'tag_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'CATEGORIES',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SOURCES',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('feed_url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('is_active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('language', 'character varying(10)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 10 } },
          }),
          col('last_fetched_at', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('site_url', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SUMMARIES',
        columns: [
          col('article_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('model', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('processed_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('prompt_version', 'character varying(50)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('sentiment', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('summary', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tokens_used', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'SUMMARIES_sentiment_check_b66bdfdc',
            sql`"sentiment" IN ('POSITIVE', 'NEUTRAL', 'NEGATIVE')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'TAGS',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'ARTICLES',
        constraint: 'ARTICLES_url_key',
        columns: ['url'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'SOURCES',
        constraint: 'SOURCES_feed_url_key',
        columns: ['feed_url'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'SUMMARIES',
        constraint: 'SUMMARIES_article_id_key',
        columns: ['article_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ARTICLES',
        index: 'ARTICLES_category_id_idx_da7213d4',
        columns: ['category_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ARTICLES',
        index: 'ARTICLES_source_id_idx_b2d19e21',
        columns: ['source_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ARTICLE_TAGS',
        index: 'ARTICLE_TAGS_article_id_idx_fafef5f5',
        columns: ['article_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ARTICLE_TAGS',
        index: 'ARTICLE_TAGS_tag_id_idx_94b47830',
        columns: ['tag_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ARTICLES',
        foreignKey: {
          name: 'ARTICLES_source_id_fkey',
          columns: ['source_id'],
          references: { schema: 'public', table: 'SOURCES', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ARTICLES',
        foreignKey: {
          name: 'ARTICLES_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'CATEGORIES', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ARTICLE_TAGS',
        foreignKey: {
          name: 'ARTICLE_TAGS_article_id_fkey',
          columns: ['article_id'],
          references: { schema: 'public', table: 'ARTICLES', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ARTICLE_TAGS',
        foreignKey: {
          name: 'ARTICLE_TAGS_tag_id_fkey',
          columns: ['tag_id'],
          references: { schema: 'public', table: 'TAGS', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'SUMMARIES',
        foreignKey: {
          name: 'SUMMARIES_article_id_fkey',
          columns: ['article_id'],
          references: { schema: 'public', table: 'ARTICLES', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
