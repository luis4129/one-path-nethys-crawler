import { App } from "./app"

const PORT = process.env.PORT || 3002;

new App().server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});