import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => 
                sheet.collectStyles(<App {...props} />),
            });

            const initialProps=
        }
    }
}