async function initMocks() {
  const { worker } = await import('./browser');
  worker.start();
}

initMocks();

export {};
