import Nav from '@components/Nav';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-4 px-5 py-4">
            <Nav />
            {children}
        </div>
    );
};

export default Layout;
