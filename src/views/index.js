import { h } from "preact";

import Home from "./pages/home";
import Layout from "./tags/layout";

export default function() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
