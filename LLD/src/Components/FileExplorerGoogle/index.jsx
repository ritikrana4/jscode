import React, { useState } from "react";

export const FileExplorer = () => {
  const [folders, setFolders] = useState({
    home: { id: "home", name: "Home", type: "folder", parent: null },
    folder1: { id: "folder1", name: "Folder 1", type: "folder", parent: "home" },
    folder2: { id: "folder2", name: "Folder 2", type: "folder", parent: "home" },
    folder4: { id: "folder4", name: "Folder 4", type: "folder", parent: "folder2" },
    file1: { id: "file1", name: "Notes.txt", type: "file", parent: "home" }
  });

  const [activeFolder, setActiveFolder] = useState("home");

  const getCurrentFolderData = () =>
    Object.values(folders).filter((val) => val.parent === activeFolder);

  const generateBreadcrumb = () => {
    let path = [];
    let activeCursor = activeFolder;
    while (activeCursor) {
      const folder = folders[activeCursor];
      if (!folder) break;
      path.unshift({ name: folder.name, id: folder.id });
      activeCursor = folder.parent;
    }
    return path;
  };

  const handleAddFolder = () => {
    const newId = `folder_${Date.now()}`;
    const newFolder = {
      id: newId,
      name: `New Folder`,
      type: "folder",
      parent: activeFolder
    };
    setFolders((prev) => ({ ...prev, [newId]: newFolder }));
  };

  const handleDelete = (id) => {
    const updated = { ...folders };

    for(let key in updated){
        if(updated[key].parent === id){
            delete updated[key]
        }
    }
    delete updated[id]
    setFolders(updated);
  };

  const handleRename = (id) => {
    const newName = prompt("Enter new name", folders[id].name);
    if (newName) {
      setFolders((prev) => ({
        ...prev,
        [id]: { ...prev[id], name: newName }
      }));
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
        {generateBreadcrumb().map((val) => (
          <div
            key={val.id}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveFolder(val.id)}
          >
            {val.name + "/"}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button onClick={handleAddFolder}>➕ Add Folder</button>

      {/* Folder/File Listing */}
      <div style={{ marginTop: "10px" }}>
        {getCurrentFolderData().length > 0 ? (
          getCurrentFolderData().map((val) => (
            <div
              key={val.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "5px"
              }}
            >
              <span
                style={{ cursor: val.type === "folder" ? "pointer" : "default" }}
                onClick={() =>
                  val.type === "folder" && setActiveFolder(val.id)
                }
              >
                {val.type === "folder" ? "📁" : "📄"} {val.name}
              </span>
              <button onClick={() => handleRename(val.id)}>✏️</button>
              <button onClick={() => handleDelete(val.id)}>🗑</button>
            </div>
          ))
        ) : (
          <i>This folder is empty</i>
        )}
      </div>
    </div>
  );
};
