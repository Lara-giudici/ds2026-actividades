import Navbar from "../Navbar";
import Footer from "../Footer";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="layout-libreria">
      <Navbar />

      <main className="contenido-libreria">
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
