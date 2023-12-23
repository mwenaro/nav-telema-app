"use client"
import { SearchBox } from '.'
import DashboardAuthNav from './DashboardAuthNav'

export default function DashboardHeader() {
  return (
    <header className="w-full px-2 py-5 border shadow-md flex justify-between">
              <SearchBox onSearch = {()=>console.log("Search handles")}/>
              <DashboardAuthNav />
            </header>
  )
}
