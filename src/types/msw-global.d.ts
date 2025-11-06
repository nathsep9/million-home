declare global {
  interface Window {
    __MSW_STARTING?: Promise<void>;
    __MSW_READY?: boolean;
  }
}
export {};
