import Header from "../layouts/header";

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className='width-container'>
        <h2>Not found</h2>
        <p>This page does not exists</p>
      </div>
    </div>
  );
}