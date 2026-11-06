import axios from 'axios';

export interface ApiErrorData {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
  raw?: unknown;
}

export class ApiError extends Error implements ApiErrorData {
  status?: number;
  fieldErrors?: Record<string, string[]>;
  raw?: unknown;

  constructor({ message, status, fieldErrors, raw }: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
    this.raw = raw;
  }
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (!axios.isAxiosError(error)) {
    return new ApiError({
      message: error instanceof Error ? error.message : 'Невідома помилка',
      raw: error,
    });
  }

  const status = error.response?.status;
  const data = error.response?.data as
    | Record<string, unknown>
    | string
    | undefined;

  if (!data) {
    return new ApiError({
      message: error.message || 'Помилка мережі',
      status,
      raw: error,
    });
  }

  if (typeof data === 'string') {
    return new ApiError({
      message: data || error.message,
      status,
      raw: data,
    });
  }

  if (typeof data.detail === 'string') {
    return new ApiError({
      message: data.detail,
      status,
      raw: data,
    });
  }

  if (
    Array.isArray(data.non_field_errors) &&
    data.non_field_errors.length > 0
  ) {
    return new ApiError({
      message: String(data.non_field_errors[0]),
      status,
      raw: data,
    });
  }

  const fieldErrors: Record<string, string[]> = {};
  const messages: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      const fieldMsgs = value.map(String);
      fieldErrors[key] = fieldMsgs;
      if (fieldMsgs.length > 0) {
        messages.push(`${key}: ${fieldMsgs[0]}`);
      }
    } else if (typeof value === 'string') {
      fieldErrors[key] = [value];
      messages.push(`${key}: ${value}`);
    }
  }

  const fallbackMessage =
    messages.length > 0
      ? messages.join('; ')
      : error.message || 'Сталася помилка при запиті';

  return new ApiError({
    message: fallbackMessage,
    status,
    fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    raw: data,
  });
};
