import { h, Component } from 'preact'

import Home from './pages/home';
import Layout from './tags/layout';
import AuthenticatedUser from "src/components/AuthenticatedUser";

export default class extends Component {
  forceRender() {
    // This is not pretty. We force a re-render
    // here because when the auth changes we want to re-render
    // the orders list as well, which is nested more deeply.
    // Redux would be nice here but it's a bit overkill for this one case.
    this.forceUpdate();
  }

  render() {
    return (
      <Layout>
        <Home />

        <AuthenticatedUser onAuthChange={this.forceRender.bind(this)} />
      </Layout>
    )
  }
}
