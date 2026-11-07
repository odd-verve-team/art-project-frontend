type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

export const getIsRefreshing = () => isRefreshing;

export const setIsRefreshing = (state: boolean) => {
  isRefreshing = state;
};

export const addToQueue = (
  resolve: QueueItem['resolve'],
  reject: QueueItem['reject'],
) => {
  failedQueue.push({ resolve, reject });
};

export const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  
  failedQueue = [];
};
