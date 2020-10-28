self.MEESHKAN_CLIENT_ID = 'MEESHKAN_BANK_3853';

(async () => {
  const url = `https://recorder.meeshkan.com/meeshkan-${self.WorkerGlobalScope?'worker':'recorder'}.js`;
  const response = await fetch(url);
  const text = await response.text();
  eval(text);
})();
