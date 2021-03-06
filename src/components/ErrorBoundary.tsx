/** @jsx jsx */
import { Component } from "react";

export class ErrorBoundary extends Component {
  public componentDidCatch(e: any) {
    alert(
      "Uhm. Something went wrong. Sorry about that. Maybe try to do start over or something. I dunno."
    );
  }

  public static getDerivedStateFromError() {}

  public render() {
    return this.props.children;
  }
}
