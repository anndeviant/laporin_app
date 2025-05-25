import TopBarLeft from './TopBarLeft';
import TopBarRight from './TopBarRight';

const TopBar = () => {
    return (
        <nav aria-label="top bar" className="flex-none flex justify-between bg-white h-16">
            <TopBarLeft />
            <TopBarRight
                searchTerm={""}
                onSearchChange={()=>{}}
            />
        </nav>
    );
}

export default TopBar;