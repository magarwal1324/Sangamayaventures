document.addEventListener('DOMContentLoaded', function () {
  // Market Growth Chart
  const ctx = document.getElementById('marketGrowthChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
      datasets: [{
        label: 'Market Size (USD Billions)',
        data: [5.2, 7.1, 9.5, 12.8, 16.2, 20.0],
        backgroundColor: 'rgba(245, 158, 11, 0.6)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b',
          titleFont: { size: 16 },
          bodyFont: { size: 14 },
          padding: 12,
          cornerRadius: 6,
          displayColors: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#e2e8f0' },
          ticks: { color: '#475569' }
        },
        x: { grid: { display: false }, ticks: { color: '#475569' } }
      }
    }
  });

  // Product data and display logic
  const products = [
    { name: 'UPS Systems', category: 'power', brands: 'Vertiv, Schneider, Eaton' },
    { name: 'PDUs (Rack Power)', category: 'power', brands: 'Vertiv Geist, APC, Eaton' },
    { name: 'Busway Systems', category: 'power', brands: 'Eaton, Schneider Electric' },
    { name: 'Liquid Cooling (DLC)', category: 'cooling', brands: 'CoolIT, Motivair, Vertiv' },
    { name: 'In-Row Cooling', category: 'cooling', brands: 'Schneider, Vertiv, Stulz' },
    { name: 'CRAC/CRAH Units', category: 'cooling', brands: 'Vertiv Liebert, Stulz CyberAir' },
    { name: 'High-Speed Switches', category: 'networking', brands: 'Arista, NVIDIA, Cisco' },
    { name: 'Routers & Firewalls', category: 'networking', brands: 'Juniper, Palo Alto, Fortinet' },
    { name: 'DAC/AOC Cables (400/800G)', category: 'networking', brands: 'Global Sourced' },
    { name: 'Fiber Optic Cabling', category: 'networking', brands: 'Corning, Panduit, CommScope' },
    { name: 'Physical Access Control', category: 'security', brands: 'HID, Gunnebo, Paxton' },
    { name: 'AI Surveillance Cams', category: 'security', brands: 'Axis Communications' },
    { name: 'Fire Suppression Systems', category: 'security', brands: 'Kidde, 3M Novec (alternative)' },
    { name: 'VESDA Smoke Detection', category: 'security', brands: 'Xtralis' },
    { name: 'Server Racks & Cabinets', category: 'infra', brands: 'Vertiv, Schneider, Eaton' },
    { name: 'Cable Management', category: 'infra', brands: 'Panduit, Legrand' },
    { name: 'KVM Switches', category: 'infra', brands: 'Raritan, ATEN' },
    { name: 'Environmental Sensors', category: 'infra', brands: 'Vertiv, APC by Schneider' },
  ];

  const productGrid = document.getElementById('product-grid');
  const filterButtons = document.querySelectorAll('.filter-button');

  function displayProducts(filter) {
    productGrid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card bg-white p-5 rounded-xl shadow-md border border-slate-100 flex flex-col items-center';
      card.innerHTML = `
        <h5 class="text-lg font-semibold text-slate-800 text-center">${product.name}</h5>
        <p class="text-sm text-slate-500 mt-1 flex-grow text-center">Brands we source:</p>
        <p class="font-medium text-slate-700 mt-1 text-center">${product.brands}</p>
        <button class="mt-3 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600" onclick="window.location='#contact';document.getElementById('message').value='Interested in ${product.name} (${product.brands})';">Request Quote</button>
      `;
      productGrid.appendChild(card);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      displayProducts(button.getAttribute('data-filter'));
    });
  });
  displayProducts('all');

  // AI Assistant mock
  const aiForm = document.getElementById('ai-form');
  const aiPromptInput = document.getElementById('ai-prompt-input');
  const aiResponseArea = document.getElementById('ai-response-area');
  const aiLoader = document.getElementById('ai-loader');

  aiForm.addEventListener('submit', async e => {
    e.preventDefault();
    const query = aiPromptInput.value.trim();
    if (!query) return;

    aiResponseArea.innerHTML = '';
    aiLoader.classList.remove('hidden');
    aiPromptInput.disabled = true;

    setTimeout(() => {
      aiResponseArea.innerHTML = "<b>Thank you for your question!</b><br>Our sourcing experts will recommend the right components for your AI data center requirement. For detailed consultation, please fill out our Contact form or WhatsApp us directly.";
      aiLoader.classList.add('hidden');
      aiPromptInput.disabled = false;
      aiPromptInput.value = '';
    }, 1500);
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Show Formspree submit success message
  document.getElementById('main-contact').addEventListener('submit', () => {
    setTimeout(() => {
      document.getElementById('form-success').classList.remove('hidden');
    }, 500);
  });
});
