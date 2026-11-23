import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: process.env['DATABASE_URL']!,
});

export const ArticleStatus = db.enums.public.ArticleStatus.members
export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus]
export const Sentiment = db.enums.public.Sentiment.members
export type Sentiment = (typeof Sentiment)[keyof typeof Sentiment]