
 async function loadPromos() {
  const list = $("#promo-list");
  if (!list.length) return; 

  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("http://localhost:4000/api/promos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    list.html("");

    if (!data.data || data.data.length === 0) {
      list.append('<p class="text-gray-500">No promos available.</p>');
      return;
    }

    data.data.forEach(promo => {
      const promoDiv = $(`
        <div class="p-4  border rounded shadow">
        <div class="flex">
         <div class='w-[200px] h-[200px]'>
          ${promo.video_url ? `<video src="${promo.video_url}" controls class="w-full class='w-[200px] h-[200px] max-h-60 mt-2"></video>` : ""}
        </div>
         <div>
             <h4 class="font-bold text-lg">${promo.title}</h4>
             <p >${promo.description}</p>
           </div>
        </div>
        </div>
      `);
      list.append(promoDiv);
    });
  } catch (err) {
    console.error(err);
    list.html('<p class="text-red-500">Failed to load promos.</p>');
  }
}


