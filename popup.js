const radios = document.querySelectorAll('input[name="engine"]');

chrome.storage.local.get(['defaultEngine'], (result) => {
  const savedEngine = result.defaultEngine || 'mazii'; 
  const radioToCheck = document.querySelector(`input[value="${savedEngine}"]`);
  if (radioToCheck) radioToCheck.checked = true;
});

radios.forEach(r => {
  r.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    chrome.storage.local.set({ defaultEngine: selectedValue }, () => {
      setTimeout(() => { window.close(); }, 200);
    });
  });
});