import {  Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function PrivateLayout() {
  return (
    <>
      <div className="w-full p-1 min-h-screen bg-gray-950">
        <div className="sticky max-w-6xl mx-auto top-9 z-10 px-8">

   
        <Navbar/>
          </div>
        <div className=" max-w-6xl mx-auto  text-white p-8  rounded-lg h-full flex flex-col overflow-x-hidden">
   

          <main className="pt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
