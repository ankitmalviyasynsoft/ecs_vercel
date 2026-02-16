
import { z } from 'zod';
import { getRegisterSchema } from './RegisterForm.config';

export type RegisterSchema = z.infer<ReturnType<typeof getRegisterSchema>>;
