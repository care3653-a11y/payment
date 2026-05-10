// Fake data for Herzing
const programs = [
  { name: "Alex Rivera", program: "BSN • Nursing", due: 1250, icon: "🩺" },
  { name: "Jordan Patel", program: "MBA • Business", due: 890, icon: "💼" }
]

const invoices = [
  { student: "Alex Rivera", desc: "Spring 2026 Tuition", amount: 1250 },
  { student: "Jordan Patel", desc: "MBA Q2 Program Fee", amount: 890 }
]

function renderPrograms() {
  const container = document.getElementById("programs")
  container.innerHTML = programs.map(p => `
    <div class="bg-white rounded-3xl p-6 border border-gray-100 hover:border-[#51B1F7] transition">
      <div class="flex items-center gap-4">
        <div class="text-6xl">${p.icon}</div>
        <div class="flex-1">
          <p class="font-semibold text-2xl">${p.name}</p>
          <p class="text-[#51B1F7]">${p.program}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-500">DUE</p>
          <p class="text-4xl font-bold text-[#013066]">$${p.due}</p>
        </div>
      </div>
    </div>
  `).join('')
}

function renderInvoices() {
  const select = document.getElementById("invoiceSelect")
  select.innerHTML = invoices.map((inv, i) => `
    <option value="${inv.amount}" ${i===0 ? 'selected' : ''}>
      ${inv.student} — ${inv.desc} ($${inv.amount})
    </option>
  `).join('')
}

document.getElementById("invoiceSelect").addEventListener("change", (e) => {
  document.getElementById("amount").value = e.target.value
})

// Payment method buttons
function createMethodButtons() {
  const container = document.getElementById("methods")
  const methods = [
    { icon: "fas fa-credit-card", label: "Credit/Debit", active: true },
    { icon: "fas fa-bank", label: "ACH / Bank" },
    { icon: "fas fa-university", label: "Wire" }
  ]
  container.innerHTML = methods.map(m => `
    <button onclick="selectMethod(this)" class="method-btn flex flex-col items-center py-6 border-2 ${m.active ? 'border-[#013066] text-[#013066]' : 'border-gray-200 hover:border-[#51B1F7]'} rounded-3xl transition">
      <i class="${m.icon} text-4xl mb-3"></i>
      <span class="font-medium">${m.label}</span>
    </button>
  `).join('')
}

window.selectMethod = function(btn) {
  document.querySelectorAll('.method-btn').forEach(b => {
    b.classList.remove('border-[#013066]', 'text-[#013066]')
    b.classList.add('border-gray-200')
  })
  btn.classList.add('border-[#013066]', 'text-[#013066]')
}

// Form submit
document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault()
  const btn = document.getElementById("payBtn")
  const original = btn.innerHTML

  btn.innerHTML = `<span class="animate-pulse">Processing...</span>`
  
  setTimeout(() => {
    document.getElementById("successModal").classList.remove("hidden")
    btn.innerHTML = original
  }, 1600)
})

window.closeModal = function() {
  document.getElementById("successModal").classList.add("hidden")
}

// Initialize everything
renderPrograms()
renderInvoices()
createMethodButtons()

// Auto-set initial amount
document.getElementById("amount").value = "1250"