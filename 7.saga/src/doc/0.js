let listener = [];
function addEventListener(listener) {
    listener.push(listener);
}
function fire() {
    listener.forEach(l=>l());
}