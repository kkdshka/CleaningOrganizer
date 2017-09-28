function importJS(url) {
    var script = document.createElement("script");
    script.src = url;

    document.head.appendChild(script);
}