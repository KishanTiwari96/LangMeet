import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useState } from "react"

const Layout = ({children, showSidebar=false}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return <div className="min-h-screen flex ">
        <div className="flex">
            {showSidebar && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        </div>
        <div className="flex-1 flex flex-col">
            <Navbar onSidebarToggle={() => setSidebarOpen((open) => !open)} />
            
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>

        
    </div>
}

export default Layout