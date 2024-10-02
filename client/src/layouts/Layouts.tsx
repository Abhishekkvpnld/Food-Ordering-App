import Header from "../components/Header";


type Props = {
  children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
return(
    <div className="flex flex-col min-h-screen">
    <Header />
    <div className="mx-auto flex-1">{children}</div>
  </div>
)
};

export default Layouts;
