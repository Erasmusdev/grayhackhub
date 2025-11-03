function showMessageBox(message) {
    const box = document.getElementById('message-box');
    const text = document.getElementById('message-text');
    if (!box || !text) return;
    text.textContent = message;
    box.classList.remove('opacity-0');
    box.classList.add('opacity-100');

    setTimeout(() => {
        box.classList.remove('opacity-100');
        box.classList.add('opacity-0');
    }, 3000);
}

window.handleDownload = function(scriptId, scriptName) {
    const script = STATIC_SCRIPTS_DATA.find(s => s.id === scriptId);
    if (script && script.downloadPath) {
        // Trigger actual download
        const link = document.createElement('a');
        link.href = script.downloadPath;
        link.download = script.downloadPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showMessageBox(`[CONFIRM] Download initiated for ${scriptName}. File transfer starting...`);
        console.log(`[LOG] Download successful for ${scriptName}.`);
    } else {
        showMessageBox(`[ERROR] Script ID ${scriptId} not found or download path missing.`);
    }
};

function renderScripts(scripts) {
    const container = document.getElementById('scripts-container');
    const loadingMessage = document.getElementById('loading-message');
    container.innerHTML = '';
    if (loadingMessage) loadingMessage.remove();

    scripts.forEach(script => {
        let cardHtml = `
            <div class="bg-gh-card-bg p-6 rounded-lg glow-border hover:border-gh-accent/50 flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-gh-primary mb-1">${script.name}</h3>
                    <p class="text-xs font-mono text-gh-accent mb-3">AUTHOR: ${script.author}</p>
                    <p class="text-gray-400 text-sm mb-4">${script.description}</p>
        `;

        if (script.usage) {
            cardHtml += `
                <p class="text-xs text-gray-500 font-mono mb-2">USAGE:</p>
                <div class="mt-0 mb-4 p-2 bg-gh-dark rounded-md border border-gh-primary/30 overflow-x-auto">
                    <p class="text-xs text-gh-primary font-mono whitespace-nowrap">
                        <span class="text-gh-accent mr-2">$</span>${script.usage}
                    </p>
                </div>
            `;
        }

        cardHtml += `
                </div>
                <div class="flex justify-between items-center pt-2">
                    <span class="text-xs text-gray-500 font-mono">v${script.version}</span>
                    <button class="px-4 py-2 rounded-md text-sm btn-neon uppercase"
                            onclick="handleDownload('${script.id}', '${script.name}')">
                        Download
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
}

function loadScripts() {
    renderScripts(STATIC_SCRIPTS_DATA);
}

window.onload = function() {
    loadScripts();
};
