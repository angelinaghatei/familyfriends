export default function Home() {
  return (
    <main className="w-[390px] min-h-screen bg-white">
      <div className="flex items-center justify-between mt-[30px] mx-5">
        <h1 className="text-[18px] font-extrabold" style={{ fontFamily: "var(--font-manrope)" }}>FamilyFriends</h1>
        <img src="/bellring.png" alt="notifications" className="w-6 h-6" />
      </div>

      <div className="mx-5 mt-4 flex items-center gap-[10px]">
        <img src="/searchtool.png" alt="search" className="w-[50px] h-[52px]" />
        <div className="flex items-center bg-white rounded-full px-4 flex-1 h-[52px] border border-[#CACACD]">
          <input
            type="text"
            placeholder="Search breeds..."
            className="bg-transparent outline-none text-sm w-full text-gray-400/20"
          />
        </div>
      </div>
    </main>
  );
}
