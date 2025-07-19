import styes from './page404.module.scss';

export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <p>Not Found</p>
    </>
  );
}
