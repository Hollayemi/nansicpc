// app/api/seed/route.ts
// POST /api/seed  — idempotent seeder: creates one accreditation code per school
// that doesn't already have one. Safe to call multiple times.

import { NextResponse } from 'next/server'
import clientPromise from '../lib/mongodb'

const DB_NAME = 'nans_icpc'
const COLLECTION = 'accreditation_codes'

// ─── All 343 accredited schools (PDF: ACCREDITATION LIST NANS NATIONAL 2026) ─
const SCHOOLS: { institution: string; zone: string; state: string }[] = [
  // ═══════════════════════════════════════════════════════════════
  // ZONE A — NORTHWEST
  // ═══════════════════════════════════════════════════════════════

  // KADUNA (12)
  { institution: 'Ahmadu Bello University, Zaria', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Division of Agricultural Colleges, Samaru Zaria', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'National Institute of Leather Science and Technology', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal College of Education, Zaria', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Nuhu Bamalli Polytechnic', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Institute of Water Resources', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Division of Agricultural Colleges, Mando Kaduna', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Kaduna State University', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Kaduna Polytechnic', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal Cooperative College', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal College of Education, Gidan Waya', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal School of Statistics, Manchock Kafanchan', zone: 'Zone A (Northwest)', state: 'Kaduna' },

  // KATSINA (7)
  { institution: 'Federal University, Dutsin-ma', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Umaru Musa Yar\'adua University, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Federal Polytechnic, Daura', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Hassan Usman Katsina Polytechnic, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Federal College of Education, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Isa Kaita College of Education, Dutsin', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'College of Agriculture, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },

  // KANO (12)
  { institution: 'Bayero University, Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Aliko Dangote University of Science and Technology, Wudil', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Yusuf Maitama Sule University, Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Federal University of Education, Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Federal Polytechnic, Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'School of Technology, Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Sa\'adatu Rimi College of Education, Kumbotso', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Audu Bako College of Agriculture, Danbatta', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Federal College of Agricultural Produce (FCAPT)', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Federal College of Education Technology, Bichi (FCE Bichi Tech)', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Informatics, Kura', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Aminu College of Education and Legal Studies', zone: 'Zone A (Northwest)', state: 'Kano' },

  // JIGAWA (6)
  { institution: 'Federal University Dutse (FUD)', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Sule Lamido University (SLU)', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Binyaminu Usman Polytechnic, Hadejia', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Jigawa State Polytechnic, Dutse', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Kazaure Informative', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'College of Education, Gumel', zone: 'Zone A (Northwest)', state: 'Jigawa' },

  // SOKOTO (8)
  { institution: 'Usman Dan Fodiyo University, Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Sokoto State University', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Shehu Shagari University of Education, Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Shehu Shagari College of Education, Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Ummaru Ali Shinkafi Polytechnic, Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'College of Agriculture, Wurno', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Federal College of Education, Gidan', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'College of Agriculture, Kware', zone: 'Zone A (Northwest)', state: 'Sokoto' },

  // KEBBI (8)
  { institution: 'Federal University, Birnin Kebbi', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Kebbi State University of Science and Technology, Aleiro', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Federal Polytechnic, Birnin Kebbi', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Adamu Augi College of Education, Argungu', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'State Polytechnic, Dakin Gari', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'College of Nursing, Birnin Kebbi', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Federal University of Agriculture, Zuru', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Federal College of Education and Technology, Yelwa', zone: 'Zone A (Northwest)', state: 'Kebbi' },

  // ZAMFARA (8)
  { institution: 'Federal University, Gusau (FUGUS)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Federal College of Education Technical, Gusau (FCET)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Federal Polytechnic, Kaura Namoda (POLY KAURA)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Zamfara College of Art and Social Sciences (ZACAS)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'College of Education, Maru (COE Maru)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Abdu Gusau Polytechnic, Talata Mafara (AGP)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Zamfara State University, Talata Mafara (ZAMSUT)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'College of Agriculture Science, Bakura (CAS Bakura)', zone: 'Zone A (Northwest)', state: 'Zamfara' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE B — SOUTHSOUTH
  // ═══════════════════════════════════════════════════════════════

  // AKWA IBOM (10)
  { institution: 'University of Uyo', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa Ibom State Polytechnic, Ikot Osura', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa Ibom State University, IKot Akpaden', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'College of Education, Afaha Nsit', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa Ibom State Science and Technology', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Federal College of Education, Ibiono', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Federal College of Science and Technology, Ikot Abasi', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa Ibom State College of Art and Culture, Ikono', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Federal Polytechnic, Ukana', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Federal College of Science and Technology, Akwa Ibom', zone: 'Zone F (Southsouth)', state: 'Akwa Ibom' },

  // BAYELSA (12)
  { institution: 'Federal University of Otuoke', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Niger Delta University, Amassoma', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Federal Polytechnic, Ekowe', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Bayelsa Medical University, Yenagoa', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'University of Africa, Toru-Orua', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Institute of Tourism and Hospitality, Yenagoa', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Isaac Jasper Boro College of Education, Sagbama', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Bayelsa State College of Nursing Sciences, Tombia', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Bayelsa State College of Health Sciences, Otuogidi', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Yenagoa Polytechnic', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Federal University of Agriculture, Bassambiri', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },
  { institution: 'Bayelsa State Polytechnic, Aleibiri', zone: 'Zone F (Southsouth)', state: 'Bayelsa' },

  // CROSS RIVER (6)
  { institution: 'University of Calabar', zone: 'Zone F (Southsouth)', state: 'Cross River' },
  { institution: 'University of Cross River State, Calabar', zone: 'Zone F (Southsouth)', state: 'Cross River' },
  { institution: 'Federal College of Education, Obudu', zone: 'Zone F (Southsouth)', state: 'Cross River' },
  { institution: 'College of Education, Akamkpa', zone: 'Zone F (Southsouth)', state: 'Cross River' },
  { institution: 'Institute of Management Technology, Ugep', zone: 'Zone F (Southsouth)', state: 'Cross River' },
  { institution: 'Federal Polytechnic, Ugep', zone: 'Zone F (Southsouth)', state: 'Cross River' },

  // DELTA (16)
  { institution: 'Delta State University, Abraka', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Delta State University of Science and Technology, Ozoro', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Dennis Osadebay University, Asaba', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'University of Delta, Agbor', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Federal University of Petroleum Resources, Effurun', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Nigerian Maritime University, Okerenkoko', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Petroleum Training Institute, Effurun', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Federal College of Education (Technical), Asaba', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Delta State Polytechnic, Ogwashi-uku', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Delta State Polytechnic, Otefe-Oghara', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Delta State College of Education, Mosogar', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'College of Education, Warri', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Delta College of Maritime Technology, Burutu', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Federal Polytechnic, Orogun', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'Federal University of Medical Sciences, Kwale', zone: 'Zone F (Southsouth)', state: 'Delta' },
  { institution: 'College of Technology, Ufuoma', zone: 'Zone F (Southsouth)', state: 'Delta' },

  // EDO (9)
  { institution: 'University of Benin', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'Ambrose Ali University, Ekpoma', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'Edo State Polytechnic, Use', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'Federal College of Education Technical, Ekiadolor, Benin City', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'Edo State University, Uzairue', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'Auchi Polytechnic, Auchi', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'College of Education, Abudu', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'College of Agriculture, Igueriakhi', zone: 'Zone F (Southsouth)', state: 'Edo' },
  { institution: 'College of Education, Igueben', zone: 'Zone F (Southsouth)', state: 'Edo' },

  // RIVERS (11)
  { institution: 'University of Port Harcourt', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers State University', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Ignatius Ajuru University of Education', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Captain Elechi Amadi Polytechnic', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers State Polytechnic, Rumuola', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Federal College of Education Technical, Omoku', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Ken-Sarowiwa Polytechnic, Boring', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Oil and Gas Polytechnic, Bonny', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Port Harcourt Polytechnic', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers State College of Health and Management Technology, Rumueme', zone: 'Zone F (Southsouth)', state: 'Rivers' },
  { institution: 'Federal University of Environment, OGONI', zone: 'Zone F (Southsouth)', state: 'Rivers' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE C — NORTHCENTRAL
  // ═══════════════════════════════════════════════════════════════

  // PLATEAU (12)
  { institution: 'Plateau State University, Bokkos', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Forestry, Jos', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Plateau State Polytechnic, Barkin Ladi', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'University of Jos', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal Polytechnic, Ny\'ak', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'College of Agriculture, Garkawa', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'College of Education, Gindiri', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal University of Education, Pankshin', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Land Resources Technology, Kuru', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Animal Health and Production Technology, Vom', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Veterinary and Medical Laboratory Technology, Vom', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Accountancy, Jos', zone: 'Zone C (Northcentral)', state: 'Plateau' },

  // BENUE (9)
  { institution: 'Benue State University, Makurdi', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Joseph Sarwuan Tarka University, Makurdi', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Benue State Polytechnic, Ugbokolo', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Federal University of Health Sciences, Otukpo', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Federal College of Education, Odugbo', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'College of Education, Oju', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Federal Polytechnic, Wannune', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Joseph Akawe Torkula Polytechnic, Makurdi', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Akpera Orshi College of Agriculture, Yandev', zone: 'Zone C (Northcentral)', state: 'Benue' },

  // KOGI (10)
  { institution: 'Federal College of Education, Okene', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Federal University, Lokoja', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State Polytechnic, Lokoja', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Confluence University of Science and Technology, Osara', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State College of Education, Ankpa', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State University, Kabba', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State College of Technical, Mopa', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Prince Abubakar Audu University, Anyigba', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Federal Polytechnic, Idah', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'College of Education, Kabba', zone: 'Zone C (Northcentral)', state: 'Kogi' },

  // FCT (3)
  { institution: 'University of Abuja', zone: 'Zone C (Northcentral)', state: 'FCT Abuja' },
  { institution: 'FCT College of Education, Zuba', zone: 'Zone C (Northcentral)', state: 'FCT Abuja' },
  { institution: 'Abuja University of Science and Technology, Abaji', zone: 'Zone C (Northcentral)', state: 'FCT Abuja' },

  // NIGER (11)
  { institution: 'Federal University of Technology, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Ibrahim Badamasi Babangida University, Lapai', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Federal College of Education, Kontagora', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Federal College of Wildlife and Management Studies, New Bussa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Federal College of Fresh Water Resources, New Bussa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'College of Agriculture, Mokwa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'College of Education, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Federal Polytechnic, Bida', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Niger State Polytechnic, Zungeru', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Abdulkadir Kure University, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fati Lami Institute of Legal & Administrative Studies (FLAILAS), Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },

  // NASARAWA (8)
  { institution: 'Nasarawa State University, Keffi', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'Federal University, Lafia', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'Federal Polytechnic, Nasarawa', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'College of Education, Akwanga', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'Isa Mustapha Agwai 1 Polytechnic, Lafia', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'Federal College of Education (Technical), Keana', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'College of Agriculture, Science and Technology, Lafia', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },
  { institution: 'Nasarawa State College of Business Studies, Akwanga', zone: 'Zone C (Northcentral)', state: 'Nassarawa' },

  // KWARA (7)
  { institution: 'University of Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State University, Malete', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Federal Polytechnic, Offa', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State Polytechnic, Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education, Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education, Oro', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education Technical, Lafiagi', zone: 'Zone C (Northcentral)', state: 'Kwara' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE D — SOUTHWEST
  // ═══════════════════════════════════════════════════════════════

  // OSUN (9)
  { institution: 'Federal Polytechnic, Ede', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Obafemi Awolowo University, Ile-Ife', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State Polytechnic, Iree', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State College of Technology, Esa-Oke', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State College of Health Technology, Ilesha', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State College of Education, Ila-Orangun', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State University, Osogbo', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Federal College of Education, Iwo', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'University of Ilesha', zone: 'Zone D (Southwest)', state: 'Osun' },

  // OYO (17)
  { institution: 'Emmanuel Alayande University of Education, Oyo', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal School of Statistics, Ibadan', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal College of Animal Health and Production Technology', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Oyo State College of Education, Lanlate', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'The Oke Ogun Polytechnic, Saki, Oyo State', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Adeosun Ogundoyin Polytechnic, Eruwa', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Oyo State College of Health Science and Technology', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal School of Surveying, Oyo', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal College of Education (Special), Oyo', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'The Polytechnic, Ibadan', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Ladoke Akintola University of Technology, Ogbomosho', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal Cooperative College, Eleyele, Ibadan', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal College of Forestry, Ibadan', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'University of Ibadan', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Federal College of Agriculture, Apata, Ibadan', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Oyo State College of Technology, Igboora', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'Abiola Ajimobi Technical University', zone: 'Zone D (Southwest)', state: 'Oyo' },

  // EKITI (6)
  { institution: 'Ekiti State University, Ado Ekiti', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'Federal University, Oye Ekiti', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'Bamidele Olumilua University of Education, Science and Technology, Ikere Ekiti', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'Ekiti State Polytechnic, Isan Ekiti', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'Federal Polytechnic, Ado Ekiti', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'Federal College of Education, Ilawe Ekiti', zone: 'Zone D (Southwest)', state: 'Ekiti' },

  // LAGOS (8)
  { institution: 'Lagos State University (LASU)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Lagos State College of Health (LASCOHET)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Federal College of Education Technical (FCET), Lagos', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'University of Lagos (UNILAG)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Yaba College of Technology (YABATECH)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Federal College of Fisheries and Marine Technology', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Lagos State University of Education, Otto/Ijanikin', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Lagos State University of Science and Technology, Ikorodu', zone: 'Zone D (Southwest)', state: 'Lagos' },

  // ONDO (9)
  { institution: 'Adekunle Ajasin University, Akungba Akoko (AAUA)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Rufus Giwa Polytechnic, Owo (RUGIPO)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Federal University of Technology, Akure (FUTA)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Federal Polytechnic, Ile-Oluji (FEDPOLEL)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Adeyemi Federal University of Education, Ondo (AFUED)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Federal College of Agriculture, Akure (FECA)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Olusegun Agagu University of Science and Technology, Okitipupa (OAUSTECH)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Ondo State University of Medical Sciences (UNIMED)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Ondo State College of Health Technology, Akure (CHTA)', zone: 'Zone D (Southwest)', state: 'Ondo' },

  // OGUN (12)
  { institution: 'Olabisi Onabanjo University (OOU), Ago-Iwoye', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Tai Solarin University of Education (TASUED), Ijebu Ode', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Ogun State Institute of Technology (OGITECH), Igbesa', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'The Gateway ICT Polytechnic, Saapade', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Ogun State Polytechnic of Health and Allied Sciences, Ilese-Ijebu', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal University of Agriculture, Abeokuta (FUNAAB)', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal College of Education, Abeokuta', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal Polytechnic, Ilaro (FPI)', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Sikiru Adetona College of Education, Science and Technology, Omu-Ijebu', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Abraham Adesanya Polytechnic, Ijebu Igbo', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'D.S Adegbenro ICT Polytechnic, Itori-Ewekoro', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Moshood Abiola Polytechnic, Abeokuta', zone: 'Zone D (Southwest)', state: 'Ogun' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE E — NORTHEAST
  // ═══════════════════════════════════════════════════════════════

  // ADAMAWA (8)
  { institution: 'Modibbo Adama University', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'Adamawa State University, Mubi', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'Adamawa State Polytechnic, Yola', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'Federal Polytechnic, Mubi', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'College of Education, Hong', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'College of Agriculture, Ganye', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'Federal College of Education, Yola', zone: 'Zone B (Northeast)', state: 'Adamawa' },
  { institution: 'Federal University of Agriculture, Mubi', zone: 'Zone B (Northeast)', state: 'Adamawa' },

  // BAUCHI (8)
  { institution: 'Abubakar Tatari Ali Polytechnic', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'Abubakar Tafawa Balewa University', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'Federal Polytechnic, Bauchi', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'College of Agriculture, Bauchi', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'College of Education, Kengere', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'College of Education, Azare', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'Bauchi State University', zone: 'Zone B (Northeast)', state: 'Bauchi' },
  { institution: 'Federal University of Science and Technology, Azare', zone: 'Zone B (Northeast)', state: 'Bauchi' },

  // BORNO (15)
  { institution: 'University of Maiduguri', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Borno State University', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Ramat Polytechnic', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Mohammet Lawan College of Agriculture, Maiduguri', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal Polytechnic, Mongonu', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Forestry Resource Management, Gongolun', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Fresh Water Fisheries, Baga', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Education Technical, Gwoza', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'College of Business and Management Administration Studies, Kundoga', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'College of Education, Waka Biyu', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Statistics, Ngala', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Army University, Biu', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Statistics, Ngala (2)', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Kashim Ibrahim College of Education, Maiduguri', zone: 'Zone B (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Horticulture, Shani', zone: 'Zone B (Northeast)', state: 'Borno' },

  // GOMBE (6)
  { institution: 'Gombe State University', zone: 'Zone B (Northeast)', state: 'Gombe' },
  { institution: 'Federal University of Kashere', zone: 'Zone B (Northeast)', state: 'Gombe' },
  { institution: 'Federal Polytechnic, Kaltungo', zone: 'Zone B (Northeast)', state: 'Gombe' },
  { institution: 'Gombe State Polytechnic, Bajoga', zone: 'Zone B (Northeast)', state: 'Gombe' },
  { institution: 'College of Education, Billiri', zone: 'Zone B (Northeast)', state: 'Gombe' },
  { institution: 'Federal College of Education (T), Gombe', zone: 'Zone B (Northeast)', state: 'Gombe' },

  // TARABA (7)
  { institution: 'Taraba State University', zone: 'Zone B (Northeast)', state: 'Taraba' },
  { institution: 'Federal University, Wukari', zone: 'Zone B (Northeast)', state: 'Taraba' },
  { institution: 'Taraba State Polytechnic', zone: 'Zone B (Northeast)', state: 'Taraba' },
  { institution: 'Federal Polytechnic, Bali', zone: 'Zone B (Northeast)', state: 'Taraba' },
  { institution: 'College of Agriculture Science and Technology, Jalingo', zone: 'Zone B (Northeast)', state: 'Taraba' },
  { institution: 'College of Education, Zing', zone: 'Zone B (Northeast)', state: 'Taraba' },
  { institution: 'Federal College of Education, Lisam Yangtu', zone: 'Zone B (Northeast)', state: 'Taraba' },

  // YOBE (9)
  { institution: 'Yobe State University, Damaturu', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'Federal Polytechnic, Damaturu', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'College of Agriculture Science and Technology, Gujba', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'Federal University, Gashua', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'Federal College of Education (Technical), Potiskum', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'College of Administration Management and Technology (CAMTECH), Potiskum', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'Umar Suleiman College of Education, Gashua', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'Mai Idriss Alooma State Polytechnic, Gaidam', zone: 'Zone B (Northeast)', state: 'Yobe' },
  { institution: 'College of Education, Nguru', zone: 'Zone B (Northeast)', state: 'Yobe' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE F — SOUTHEAST
  // ═══════════════════════════════════════════════════════════════

  // ANAMBRA (9)
  { institution: 'Nnamdi Azikiwe University, Awka', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Nwafor Orizu College of Education, Nsugbe', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Federal Polytechnic, Oko', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Chukwuemeka Odimegwu Ojukwu University, Igbariam', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Federal College of Education Technical, Umunze', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Anambra State College of Agriculture, Isu-mgbakwu', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Nigeria Metallurgical Training Institute, Onitsha', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Institute of Conflict Resolution, Obosi', zone: 'Zone E (Southeast)', state: 'Anambra' },
  { institution: 'Anambra State Polytechnic, Mgbakwu', zone: 'Zone E (Southeast)', state: 'Anambra' },

  // ABIA (6)
  { institution: 'Michael Okpara University of Agriculture, Umudike', zone: 'Zone E (Southeast)', state: 'Abia' },
  { institution: 'Abia State Polytechnic, Aba', zone: 'Zone E (Southeast)', state: 'Abia' },
  { institution: 'Abia State University, Uturu', zone: 'Zone E (Southeast)', state: 'Abia' },
  { institution: 'Federal College of Education, Ohafia', zone: 'Zone E (Southeast)', state: 'Abia' },
  { institution: 'Abia State College of Education Technology, Arochukwu', zone: 'Zone E (Southeast)', state: 'Abia' },
  { institution: 'Federal Polytechnic, Umunneochi', zone: 'Zone E (Southeast)', state: 'Abia' },

  // ENUGU (13)
  { institution: 'University of Nigeria, Nsukka', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'University of Nigeria, Enugu Campus', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Enugu State University of Science and Technology', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Institute of Management and Technology, Enugu', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Enugu State College of Education Technical', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Enugu State Polytechnic, Iwollo', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Federal College of Education, Eha Amufu', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Federal School of Social Works, Emene', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Federal School of Statistics, Enugu', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Federal Cooperative College, Oji Rivers', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Federal University of Allied Health Sciences, Enugu', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'Federal Polytechnic, Ohodo', zone: 'Zone E (Southeast)', state: 'Enugu' },
  { institution: 'State University of Medical and Applied Sciences, Enugu', zone: 'Zone E (Southeast)', state: 'Enugu' },

  // IMO (8)
  { institution: 'Imo State University', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'Kingsley Ozumba Mbadiwe University', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'Federal Polytechnic, Nekede, Owerri', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'University of Agriculture and Environmental Science, Umuagwo', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'Alvan Ikoku Federal University of Education', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'Federal University of Technology, Owerri', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'Imo State Polytechnic, Omuma', zone: 'Zone E (Southeast)', state: 'Imo' },
  { institution: 'Imo State College of Education', zone: 'Zone E (Southeast)', state: 'Imo' },

  // EBONYI (8)
  { institution: 'Ebonyi State University', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'Alex Ekwueme Federal University, Ndufu Aleke Ikwo', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'King David Federal University of Medical Science, Uburu', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'Akanu Ibiam Federal Polytechnic, Unwana', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'Federal College of Agriculture, Ishiagu', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'Federal College of Education, Isu', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'Ebonyi State College of Education, Ikwo', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
  { institution: 'Federal School of Forestry, Ishiagu', zone: 'Zone E (Southeast)', state: 'Ebonyi' },
]

// ─── Code generator ──────────────────────────────────────────────────────────
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `NANS-${seg(4)}-${seg(4)}`
}

async function uniqueCode(
  db: import('mongodb').Db,
  existing: Set<string>
): Promise<string> {
  let code = generateCode()
  let attempts = 0
  while (existing.has(code) && attempts < 20) {
    code = generateCode()
    attempts++
  }
  existing.add(code)
  return code
}

// ─── POST /api/seed ───────────────────────────────────────────────────────────
export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const col = db.collection(COLLECTION)

    // Fetch all institutions that already have a code
    const alreadySeeded = await col
      .find({}, { projection: { institution: 1, code: 1 } })
      .toArray()

    const seededNames = new Set(alreadySeeded.map((d) => d.institution as string))
    const existingCodes = new Set(alreadySeeded.map((d) => d.code as string))

    // Determine which schools still need a code
    const missing = SCHOOLS.filter((s) => !seededNames.has(s.institution))

    if (missing.length === 0) {
      return NextResponse.json({
        message: 'All schools already have codes — nothing to seed.',
        total: SCHOOLS.length,
        seeded: 0,
        existing: alreadySeeded.length,
      })
    }

    // Build insert docs
    const docs = await Promise.all(
      missing.map(async (school) => ({
        code: await uniqueCode(db, existingCodes),
        institution: school.institution,
        zone: school.zone,
        state: school.state,
        generatedFor: null,
        status: 'unused',
        usedAt: null,
        usedBy: null,
        createdAt: new Date(),
      }))
    )

    await col.insertMany(docs, { ordered: false })

    return NextResponse.json({
      message: `Seeded ${docs.length} school(s) successfully.`,
      total: SCHOOLS.length,
      seeded: docs.length,
      existing: alreadySeeded.length,
      sample: docs.slice(0, 3).map((d) => ({ institution: d.institution, code: d.code })),
    })
  } catch (err) {
    console.error('[POST /api/seed]', err)
    return NextResponse.json({ error: 'Seed failed', detail: String(err) }, { status: 500 })
  }
}

// ─── GET /api/seed — health check / dry-run status ───────────────────────────
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const col = db.collection(COLLECTION)

    const count = await col.countDocuments()
    const missing = SCHOOLS.filter(async () => {
      const names = (await col.distinct('institution')) as string[]
      return !names.includes
    })

    return NextResponse.json({
      totalSchoolsInList: SCHOOLS.length,
      codesInDatabase: count,
      status: count >= SCHOOLS.length ? 'fully_seeded' : 'partial',
      hint: count < SCHOOLS.length
        ? 'POST /api/seed to populate remaining schools'
        : 'All schools have codes',
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}