function handleScriptDownload(scriptId, scriptName) {
  const script = STATIC_SCRIPTS_DATA.find(s => s.id === scriptId);
  if (script && script.downloadPath) {
    const link = document.createElement('a');
    link.href = script.downloadPath;
    link.download = script.downloadPath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`[LOG] Download started for ${scriptName}.`);
  } else {
    console.error(`[ERROR] Script ${scriptName} not found or download path missing.`);
  }
}

function renderScripts(scripts) {
  const container = document.getElementById('scripts-container');
  if (!container) return;
  container.innerHTML = '';

  scripts.forEach(script => {
    const cardHtml = `
      <div class="bg-gh-card-bg rounded-lg glow-border flex flex-col border border-gh-primary/30 hover:border-gh-primary/70 transition">
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="text-xl font-bold text-gh-primary mb-1">${script.name}</h3>
          <p class="text-xs font-mono text-gh-accent mb-2">AUTHOR: ${script.author}</p>
          <p class="text-gray-400 text-sm mb-3 flex-grow">${script.description}</p>
          <div class="flex justify-between items-center mt-auto">
            <span class="text-xs text-gray-500 font-mono">v${script.version} // ${script.downloads} Downloads</span>
            <button class="px-3 py-1.5 rounded-md text-sm bg-gh-accent hover:bg-indigo-500 transition duration-150 font-semibold"
              onclick="handleScriptDownload('${script.id}', '${script.name}')">
              Download
            </button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
  });
}
