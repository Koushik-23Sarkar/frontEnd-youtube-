<>
  <li class="w-full">
    <button class="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">
      Personal Information
    </button>
  </li>
  <li class="w-full">
    <button class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
      Channel Information
    </button>
  </li>
  <li class="w-full">
    <button class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
      Change Password
    </button>
  </li>
</>;










<>
  <li className="w-full">
    <button
      onClick={() => setActiveTab(activeTabStatus.Video)}
      className={`w-full px-3 py-1.5 border-b-2 ${
        activeTab === activeTabStatus.Video
          ? "border-[#ae7aff] text-[#ae7aff]"
          : "border-transparent text-gray-400"
      }`}
    >
      Personal Information
    </button>
  </li>
  <li className="w-full">
    <button
      onClick={() => setActiveTab(activeTabStatus.Video)}
      className={`w-full px-3 py-1.5 border-b-2 ${
        activeTab === activeTabStatus.Video
          ? "border-[#ae7aff] text-[#ae7aff]"
          : "border-transparent text-gray-400"
      }`}
    >
      Channel Information
    </button>
  </li>
  <li className="w-full">
    <button
      onClick={() => setActiveTab(activeTabStatus.Video)}
      className={`w-full px-3 py-1.5 border-b-2 ${
        activeTab === activeTabStatus.Video
          ? "border-[#ae7aff] text-[#ae7aff]"
          : "border-transparent text-gray-400"
      }`}
    >
      Change Password
    </button>
  </li>
</>;
