function handleThemeDownload(themeId, themeName) {
    const theme = STATIC_THEMES_DATA.find(t => t.id === themeId);
    if (theme && theme.downloadPath) {
        const link = document.createElement('a');
        link.href = theme.downloadPath;
        link.download = theme.downloadPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`[LOG] Download started for ${themeName}.`);
    } else {
        console.error(`[ERROR] Theme ${themeName} not found or download path missing.`);
    }
}

function renderThemes(themes) {
    const container = document.getElementById('themes-container');
    container.innerHTML = '';

    themes.forEach(theme => {
        const cardHtml = `
            <div class="bg-gh-card-bg rounded-lg glow-border flex flex-col">
                <div class="card-image-container">
                    <img src="${theme.preview}" alt="${theme.name} Preview" class="rounded-t-lg">
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-gh-primary mb-1">${theme.name}</h3>
                    <p class="text-xs font-mono text-gh-accent mb-2">AUTHOR: ${theme.author}</p>
                    <p class="text-gray-400 text-sm mb-3 flex-grow">${theme.description}</p>
                    <div class="flex justify-between items-center mt-auto">
                        <span class="text-xs text-gray-500 font-mono">v${theme.version} // ${theme.downloads} Downloads</span>
                        <button class="px-3 py-1.5 rounded-md text-sm bg-gh-accent hover:bg-indigo-500 transition duration-150 font-semibold"
                                onclick="handleThemeDownload('${theme.id}', '${theme.name}')">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// Load themes on page load
window.onload = () => {
    renderThemes(STATIC_THEMES_DATA);
};
