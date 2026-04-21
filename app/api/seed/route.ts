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

  // KADUNA
  { institution: 'Federal University Of Education Zaria', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Ahmadu Bello University', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Nigerian institute of leather and science technology', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal Cooperative College Kaduna', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'National Institute Of water resources', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal Collage of forestry Mechanization Afaka', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Kaduna Polytechnic', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Division of Agricultural Collages, Mando', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Kaduna State University', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Nuhu Bamalli Polytechnic zaria', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Division of Agricultural Colleges Samaru', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'The Federal School of Statistics, Manchok', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Kaduna State College Of Education Gidan Waya', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal University of Science and Technology Kachia', zone: 'Zone A (Northwest)', state: 'Kaduna' },
  { institution: 'Federal University of Education, Zaria', zone: 'Zone A (Northwest)', state: 'Kaduna' },

  // KATSINA
  { institution: 'Federal University, Dutsin-ma', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Umaru Musa Yar adua University, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Federal Polytechnic, Daura', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Hassan Usman Katsina Polytechnic, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Federal College of Education, Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'Isa Kaita College of Education Dutsin', zone: 'Zone A (Northwest)', state: 'Katsina' },
  { institution: 'College of Agriculture Katsina', zone: 'Zone A (Northwest)', state: 'Katsina' },

  // KANO
  { institution: 'Bayeru university Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Aliko Dangote university of science and technology Wudil', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Yusuf Maitama Sule Federal University of Education Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Federal Polytechnic Kabo', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Kano state Polytechnic', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'saadatu Rimi College of Education Kumbotso', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Audu Bako college of Agriculture Dambatta', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Federal college of Education technical Bichi', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'federal college of agriculture produce technology Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'informatics Institute Kura', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'school of Environmental Studies Gwarzo Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Dr. Rabiu Musa Kwankwaso College of Education Kura', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Kano state college of education and preliminary studies Kano', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'Aminu Kano College of Education and Legal Studies', zone: 'Zone A (Northwest)', state: 'Kano' },
  { institution: 'federal university of science and Technology Kabo', zone: 'Zone A (Northwest)', state: 'Kano' },

  // JIGAWA
  { institution: 'Federal University Dutse FUD', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Sule Lamido University Kafin Hausa SLU', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Binyaminu Usman Polytechnic Hadejia', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Jigawa State polytechnic Dutse', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Jigawa state College of information technology Kazaure', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Hussain Adamu Federal Polytechnic kazaure', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Khadija University Majia', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'College of Education gume', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'College of Education and Islamic Studies Rigim', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Federal University of Technology Babura', zone: 'Zone A (Northwest)', state: 'Jigawa' },
  { institution: 'Jigawa State College of Remedial and Advanced Studies Babura', zone: 'Zone A (Northwest)', state: 'Jigawa' },

  // SOKOTO
  { institution: 'Usmanu Danfodiyo University Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Sokoto State University', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Shehu Shagari University of Education Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Shehu Shagari College of Education Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Ummaru Ali Shinkafi Polytechnic Sokoto', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'College of Agriculture Wurno', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Federal College of Education Gidan Madi', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'College of Agriculture Kware', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'Federal Polytechnic Yabo', zone: 'Zone A (Northwest)', state: 'Sokoto' },
  { institution: 'College of Legal and Islamic Studies Wamakko', zone: 'Zone A (Northwest)', state: 'Sokoto' },

  // KEBBI
  { institution: 'Federal University, Birnin Kebbi (FUBK)', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Federal University of Agriculture, Zuru (FUAZ)', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Waziri Umaru Federal Polytechnic, Birnin Kebbi', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Federal College of Education (Technical), Yauri', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Abdullahi Fodio University of Science and Technology, Aliero (AFUSTA)', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Kebbi State Polytechnic, Dakingari', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Adamu Augie College of Education, Argunu', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'Kebbi State College of Basic and Advanced Studies, Yauri', zone: 'Zone A (Northwest)', state: 'Kebbi' },
  { institution: 'College of Agriculture Zuru', zone: 'Zone A (Northwest)', state: 'Kebbi' },

  // ZAMFARA
  { institution: 'Federal University Gusau', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Zamfara State University, Talata Mafara', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Federal University of Health Sciences and Technology, Tsafe (FUHSATT)', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Federal Polytechnic Kaura Namoda', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Federal College of Education (Technical), Gusau', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Abdu Gusau Polytechnic, Talata Mafara', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'Zamfara College of Arts and Science, Gusau', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'College of Agriculture and Animal Science, Bakura', zone: 'Zone A (Northwest)', state: 'Zamfara' },
  { institution: 'College of Education, Maru', zone: 'Zone A (Northwest)', state: 'Zamfara' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE B — SOUTHSOUTH
  // ═══════════════════════════════════════════════════════════════

  // AKWA IBOM
  { institution: 'University of uyo, uyo', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa ibom state polytechnic, ikot osura', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa ibom state University, IKot Akpaden', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'college of Education, Afaha Nsit', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akwa ibom state science and Technology', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'federal college of Education, ibiono', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'federal college of science and Technology, Ikot Abasi', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Akaw ibom state art and culture, ikono', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'Federal polytechnic ukana', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },
  { institution: 'federal college of science and technology', zone: 'Zone B (Southsouth)', state: 'Akwa Ibom' },

  // BAYELSA
  { institution: 'Federal University of Otouke', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Niger Delta University, Amassoma', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Federal Polytechnic, Ekowe', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Bayelsa Medical University, Yenagoa', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'University of Africa, Toru-Orua', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Institute of Tourism and Hospitality, Yenagoa', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Isaac Jasper Boro College of Education, Sagbama', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Yenagoa Polytechnic', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Federal University of Agriculture, Bassambiri', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },
  { institution: 'Bayelsa State Polytechnic, Aleibiri', zone: 'Zone B (Southsouth)', state: 'Bayelsa' },

  // CROSS RIVER
  { institution: 'University of Calabar, Calabar', zone: 'Zone B (Southsouth)', state: 'Cross River' },
  { institution: 'Federal University of Environment, OGONI', zone: 'Zone B (Southsouth)', state: 'Cross River' },
  { institution: 'Port Harcourt polytechnic', zone: 'Zone B (Southsouth)', state: 'Cross River' },
  { institution: 'College of Education, Akampka', zone: 'Zone B (Southsouth)', state: 'Cross River' },
  { institution: 'Institute of Management Technology, Upeg', zone: 'Zone B (Southsouth)', state: 'Cross River' },
  { institution: 'Federal Polytechnic, Upeg', zone: 'Zone B (Southsouth)', state: 'Cross River' },

  // DELTA
  { institution: 'Delta State University, Abraka', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Delta State University of Science and Technology, Ozoro', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Dennis Osadebay University, Asaba', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'University of Delta, Agbor', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Federal University of Petroleum Resources, Effurun', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Nigerian Maritime University, Okerenkoko', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Petroleum Training Institute, Effurun', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Federal College of Education (Technical), Asaba', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Delta State Polytechnic, Ogwashi-uku', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Delta State Polytechnic, Otefe-Ohara', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Delta State College of Education, Mosogar', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'College of Education, Warri', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Delta College of Maritime Technology, Burutu', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Federal Polytechnic Orogun', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'Federal University of Medical Sciences Kwale', zone: 'Zone B (Southsouth)', state: 'Delta' },
  { institution: 'College of Technology Ufuoma', zone: 'Zone B (Southsouth)', state: 'Delta' },

  // EDO
  { institution: 'University of Benin', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'Ambrose Ali University, Ekpoma', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'Edo State Polytechnic, Use', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'Federal College of Education, Technical Ekialolor, Benin City', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'Edo State University, Uzairue', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'Auchi Polytechnic, Auchi', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'College of Education, Abudu', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'College of Agriculture, Igueriakhi', zone: 'Zone B (Southsouth)', state: 'Edo' },
  { institution: 'College of Education, Igueben', zone: 'Zone B (Southsouth)', state: 'Edo' },

  // RIVERS
  { institution: 'University of Port Harcourt', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers state University', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Ignatius Ajuru University of Education', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Captain Elechi Amadi Polytechnic', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers State Polytechnic, Rumuola', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Federal College of Education Technical, Omoku', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Ken-Sarowiwa Polytechnic, Boring', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Oil and Gas Polytechnic, Bonny', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers state College of Health and Management Technology, Rumueme', zone: 'Zone B (Southsouth)', state: 'Rivers' },
  { institution: 'Rivers state University of Science and Technology', zone: 'Zone B (Southsouth)', state: 'Rivers' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE C — NORTHCENTRAL
  // ═══════════════════════════════════════════════════════════════

  // PLATEAU
  { institution: 'Plateau State University, Bokkos', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Forestry, Jos', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Plateau State Polytechnic, Barkin Ladi', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'University of Jos', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal Polytechnic, Nyak', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'College of Agriculture, Garkawa', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'College of Education, Gindiri', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal University of Education, Pankshin', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Land Resources Technology, Kuru', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Animal Health and Production Technology, Vom', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Veterinary and Medical Laboratory Technology, Vom', zone: 'Zone C (Northcentral)', state: 'Plateau' },
  { institution: 'Federal College of Accountancy, Jos', zone: 'Zone C (Northcentral)', state: 'Plateau' },

  // BENUE
  { institution: 'Benue State University, Makurdi', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Joseph Sarwuan Tarka University, Makurdi', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Benue State Polytechnic, Ugbokolo', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Federal University of Health Sciences, Otukpo', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Federal College of Education, Odugbo', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'College of Education, Oju', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Federal Polytechnic, Wannune', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Joseph Akawé Torkula Polytechnic, Makurdi', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Akpera Orshi College of agric, Yandev', zone: 'Zone C (Northcentral)', state: 'Benue' },
  { institution: 'Benue state University of Agriculture, science and technology Ihigh', zone: 'Zone C (Northcentral)', state: 'Benue' },

  // KOGI
  { institution: 'Federal College of Education Okene', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Federal University lokoja', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State Polytechnic lokoja', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Confluence University of science and Technology Osara', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State college Education Ankpa', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi State University Kabba', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Kogi state college of technical Mopa', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Prince Abubakar Audu University Anyigba', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'Federal Polytechnic Idah', zone: 'Zone C (Northcentral)', state: 'Kogi' },
  { institution: 'College of Education, Kabba', zone: 'Zone C (Northcentral)', state: 'Kogi' },

  // FCT
  { institution: 'University of Abuja', zone: 'Zone C (Northcentral)', state: 'FCT' },
  { institution: 'FCT College of Education, Zuba', zone: 'Zone C (Northcentral)', state: 'FCT' },
  { institution: 'Abuja University of Science and Technology, Abaji', zone: 'Zone C (Northcentral)', state: 'FCT' },

  // NIGER
  { institution: 'Fed. University of Technology, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fed Polytechnic, Bida', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Niger College Agriculture, Mokwa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Abdulkadir Kure University, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fed. University of Education. Kontagora', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fed. College of Fishery and Fresh Water Technology. New Bussa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fed. College of Education, Kontagora', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Minna Institute of Technology and Innovation, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Umar Sanda College of Education, Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fed. College of Wildlife Management. New-Bussa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Niger State Polytechnic. Zungeru', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Abdulsalam Abubakar University Agriculture and Climate Action. Mokwa', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Fati Lami Institute for Legal and Administrative, (FLAILAS). Minna', zone: 'Zone C (Northcentral)', state: 'Niger' },
  { institution: 'Ibrahim Badamasi Babagida University, Lapai', zone: 'Zone C (Northcentral)', state: 'Niger' },

  // NASARAWA
  { institution: 'Nasarawa State University, Keffi', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'Federal University, Lafia', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'Federal Polytechnic, Nasarawa', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'College of Education, Akwanga', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'Isa Mustapha Agwai 1 polytechnic, Lafia', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'Federal College of Education (Technical), Keana', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'College of Agriculture, Science and Technology, Lafia', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },
  { institution: 'Nasarawa State College of business studies Akwanga', zone: 'Zone C (Northcentral)', state: 'Nasarawa' },

  // KWARA
  { institution: 'University of Ilorin, Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State University, Malete', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Federal Polytechnic, Offa', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State Polytechnic, Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State University of Education', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education, Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education, Oro', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education Technical, Lafiaqi', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'Kwara State College of Education, Ilemona', zone: 'Zone C (Northcentral)', state: 'Kwara' },
  { institution: 'College of Aviation, Ilorin', zone: 'Zone C (Northcentral)', state: 'Kwara' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE D — SOUTHWEST
  // ═══════════════════════════════════════════════════════════════

  // OSUN
  { institution: 'Federal Polytechnic, Ede', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Obafemi Awolowo University, Ile-ife', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State polytechnic, Iree', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State College of Technology, Esa-Oke', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State College of Health Technology, Ilesha', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State College of Education, Ila-Orangun', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Osun State University, Osogbo', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Federal College of Education, Iwo', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'University of Ilesha', zone: 'Zone D (Southwest)', state: 'Osun' },
  { institution: 'Federal University of Health science Ila Orogun', zone: 'Zone D (Southwest)', state: 'Osun' },

  // OYO
  { institution: 'EMMANUEL ALAYANDE UNIVERSITY OF EDUCATION OYO', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL SCHOOL OF STATISTICS, IBADAN', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL COLLEGE OF ANIMAL HEALTH AND PRODUCTION TECH', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'OYO STATE COLLEGE OF EDUCATION LANLATE', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'THE OKE OGUN POLYTECHNIC, SAKI OYO STATE', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'ADEOSUN OGUNDOYIN POLYTECHNIC, ERUWA', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'OYO STATE COLLEGE OF HEALTH SCIENCE AND TECHNOLOGY', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL SCHOOL OF SURVEYING, OYO', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL COLLEGE OF EDUCATION (SPECIAL OYO)', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'THE POLYTECHNIC IBADAN', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'LADOKE AKINTOLA UNIVERSITY OF TECHNOLOGY, OGBOMOSHO', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL COOPERATIVE COLLEGE, ELEYELE IBADAN', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL COLLEGE OF FORESTRY, IBADAN', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'UNIVERSITY OF IBADAN', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'FEDERAL COLLEGE OF AGRICULTURE APATA IBADAN', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'OYO STATE COLLEGE OF TECHNOLOGY, IGBOORA', zone: 'Zone D (Southwest)', state: 'Oyo' },
  { institution: 'ABIOLA AJIMOBI TECHNICAL UNIVERSITY', zone: 'Zone D (Southwest)', state: 'Oyo' },

  // EKITI
  { institution: 'EKITI STATE UNIVERSITY, ADO EKITI', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'FEDERAL UNIVERSITY OYE EKITI, OYE EKITI', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'BAMIDELE OLUMILUA UNIVERSITY OF EDUCATION, SCIENCE AND TECHNOLOGY, IKERE EKITI', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'EKITI STATE POLYTECHNIC, ISAN EKITI', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'FEDERAL POLYTECHNIC ADO EKITI', zone: 'Zone D (Southwest)', state: 'Ekiti' },
  { institution: 'FEDERAL COLLEGE OF EDUCATION ILAWE EKITI', zone: 'Zone D (Southwest)', state: 'Ekiti' },

  // LAGOS
  { institution: 'Lagos State University (LASU)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Federal College of Education Technical(FECT)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'University of Lagos (UNILAG)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Yaba College of Technology (YABATECH)', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Federal College of Fisheries and Marine Technology', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Lagos State University of Education Otto/Ijanikin', zone: 'Zone D (Southwest)', state: 'Lagos' },
  { institution: 'Lagos State university of science and technology. Ikorodu', zone: 'Zone D (Southwest)', state: 'Lagos' },

  // ONDO
  { institution: 'Adekunle Ajasin University Akungba Akoko (AAUA)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Rufus Giwa Polytechnic Owo (RUGIPO)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Federal University Of Technology Akure (FUTA)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Federal Polytechnic Ile-Oluji (FEDPOLEL)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Adeyemi Federal University Of Education Ondo(AFUED)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Federal College Of Agriculture Akure (FECA)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Olusegun Agagu University Of Science and Technology Okitipupa (OAUSTECH)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Ondo State University Of Medical Sciences Ondo (UNIMED)', zone: 'Zone D (Southwest)', state: 'Ondo' },
  { institution: 'Ondo State College of Health Technology Akure (CHTA)', zone: 'Zone D (Southwest)', state: 'Ondo' },

  // OGUN
  { institution: 'Olabisi Onabanjo University (OOU), Ago-Iwoye', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Tai Solarin University of Education (TASUED), Ijebu Ode', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Ogun State Institute of Technology (OGITECH), Igbesa', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'The Gateway ICT Polytechnic, Saapade', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Ogun State Polytechnic of Health and Allied Sciences, Ilese-Ijebu', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal University of Agriculture, Abeokuta (FUNAAB)', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal College of Education, Abeokuta', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal Polytechnic Ilaro (FPI)', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Sikiru Adetona College of Education, Science and Technology, Omu-Ijebu', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Abraham Adesanya Polytechnic, Ijebu Igbo', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'D.S Adegbemro ICT Polytechnic, itori-Ewekoro', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Moshood Abiola Polytechnic, Abeokuta', zone: 'Zone D (Southwest)', state: 'Ogun' },
  { institution: 'Federal university of medicine and medical sciences Abeokuta. (FUNMSA)', zone: 'Zone D (Southwest)', state: 'Ogun' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE E — NORTHEAST
  // ═══════════════════════════════════════════════════════════════

  // ADAMAWA
  { institution: 'Modibbo Adama University', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'Adamawa State University, Mubi', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'Adamawa State Polytechnic, Yola', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'Federal Polytechnic, Mubi', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'College Of Education, Hong', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'College of Agric, Ganve', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'Federal College of Education, Yola', zone: 'Zone E (Northeast)', state: 'Adamawa' },
  { institution: 'Federal University of Agricultur, Mubi', zone: 'Zone E (Northeast)', state: 'Adamawa' },

  // BAUCHI
  { institution: 'Abubakar Tatari Ali Polytechnic', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'Abubakar Tafawa Balewa University', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'Federal Polytechnic, Bauchi', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'College of Agriculture, Bauchi', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'College of Education kengere', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'College of Education Azare', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'Baushi State University', zone: 'Zone E (Northeast)', state: 'Bauchi' },
  { institution: 'Federal University of Science and Technology Azare', zone: 'Zone E (Northeast)', state: 'Bauchi' },

  // BORNO
  { institution: 'University of Maiduguri', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Borno State University', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Ramat Polytechnic', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Mohammed Lawan College of Agriculture Maiduguri', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal Polytechnic Mangonu', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Forestry Resource Management Gongolun', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Fresh Water Fisheries Baga', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Education Technical Gwoza', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'College of Business and Management Administration Studies Kundoga', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'College of Education Waka Biyu', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Umar Ibn Ibrahim El-Kanemi college of education science and technology Bama', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Army University Biu', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Statistics, Ngala', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Kashim Ibrahim College of Education, Maiduguri', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal College of Horiculture Shani', zone: 'Zone E (Northeast)', state: 'Borno' },
  { institution: 'Federal University of Agriculture and Entrepreneurship', zone: 'Zone E (Northeast)', state: 'Borno' },

  // GOMBE
  { institution: 'Gombe State University', zone: 'Zone E (Northeast)', state: 'Gombe' },
  { institution: 'Federal University of Kalsere', zone: 'Zone E (Northeast)', state: 'Gombe' },
  { institution: 'Federal Polytechnic Kaltungo', zone: 'Zone E (Northeast)', state: 'Gombe' },
  { institution: 'Gombe State Polytechnic Bajoga', zone: 'Zone E (Northeast)', state: 'Gombe' },
  { institution: 'College of Education Billiri', zone: 'Zone E (Northeast)', state: 'Gombe' },
  { institution: 'Federal College of Education (T) Gombe', zone: 'Zone E (Northeast)', state: 'Gombe' },
  { institution: 'Federal college of horticulture and soil science', zone: 'Zone E (Northeast)', state: 'Gombe' },

  // TARABA
  { institution: 'Taraba State University', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'Federal University Wukari', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'Taraba State Polytechnic', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'Federal Polytechnic Bali', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'College of Agriculture Science and Technology Jalingo', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'College of Education, Zing', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'Federal College of Education Lisam Yangtu', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'Taraba State University of Tropical and climate action, Gembu, sardaua LGA', zone: 'Zone E (Northeast)', state: 'Taraba' },
  { institution: 'Federal university of science and technology Lau', zone: 'Zone E (Northeast)', state: 'Taraba' },

  // YOBE
  { institution: 'FEDERAL UNIVERSITY GASHUA', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'UMAR SULEIMAN COLLEGE OF EDUCATION GASHUA', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'COLLEGE OF EDUCATION NGURU', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'COLLEGE OF ADMINISTRATION AND BUSINESS STUDIES', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'FEDERAL COLLEGE OF EDUCATION (TECHNICAL) POTISKUM', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'MAI IDRISS ALOOMA STATE POLYTECHNIC GEIDAM', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'COLLEGE OF ADMINISTRATIVE, MANAGEMENT AND TECHNOLOGY (CAMTECH) POTISKUM', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'COLLEGE OF AGRICULTURAL SCIENCE AND TECHNOLOGY GUJBA', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'FEDERAL POLYTECHNIC DAMATURU', zone: 'Zone E (Northeast)', state: 'Yobe' },
  { institution: 'YOBE STATE UNIVERSITY DAMATURU', zone: 'Zone E (Northeast)', state: 'Yobe' },

  // ═══════════════════════════════════════════════════════════════
  // ZONE F — SOUTHEAST
  // ═══════════════════════════════════════════════════════════════

  // ANAMBRA
  { institution: 'Nnamdi Azikiwe University, Awka', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Nwafor Orizu College of Education, Nsugb', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Federal Polytechnic, Oko', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Chukwuemeka Odimegwu Ojukwu University, Igbariam', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Federal College of Education Technical, Umunze', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Anambra State College of Agriculture Isu-mgbakwu', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Nigeria Metallurgical Training Institute, Onitsha', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Institute of conflict resolution Obosi', zone: 'Zone F (Southeast)', state: 'Anambra' },
  { institution: 'Anambra State Polytechnic, Mgbakwu', zone: 'Zone F (Southeast)', state: 'Anambra' },

  // ABIA
  { institution: 'Michael okpara university of Agriculture. Umudike', zone: 'Zone F (Southeast)', state: 'Abia' },
  { institution: 'Abia state Polytechnic Aba', zone: 'Zone F (Southeast)', state: 'Abia' },
  { institution: 'Abia state university Uturu', zone: 'Zone F (Southeast)', state: 'Abia' },
  { institution: 'Federal college of Education Ofeme', zone: 'Zone F (Southeast)', state: 'Abia' },
  { institution: 'Abia state college of Education Tech.Arochukwu', zone: 'Zone F (Southeast)', state: 'Abia' },
  { institution: 'Federal polythemic Umunneochi', zone: 'Zone F (Southeast)', state: 'Abia' },

  // ENUGU
  { institution: 'University of Nigeria Nsukka', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'University of Nigeria Enugu Campus', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Enugu State University of Science and Technology', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Institute of Management and Technology', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Enugu State College of Education Technical', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Enugu State Polytechnic Iwoilo', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Federal College of Education Eha Amufu', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Federal School of Social Works Emene', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Fed School of Statistics', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Fed Cooperative College Oji Rivers', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Fed University of Allied Health Sciences', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'Fed Polytechnic Ohodo', zone: 'Zone F (Southeast)', state: 'Enugu' },
  { institution: 'State University of Medical and Applied Sciences, Enugu', zone: 'Zone F (Southeast)', state: 'Enugu' },

  // IMO
  { institution: 'Imo state university Owerri', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Federal university Of Technology Owerri', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Imo State Polytechnic Omuma', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Alvan Ikoku Federal University Of Education Owerri', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Benjamin Uwajumuogu State College Of Education Ihitte Uboma', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Federal Polytechnic Nekede Owerri', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Kingsley Ozumba Mbaidwe University Imo State', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'University Of Agriculture and Environmental Science Umuagwu', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Federal College Of Land Resources Technology Owerri', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'School Of Health Amaigbo', zone: 'Zone F (Southeast)', state: 'Imo' },
  { institution: 'Imo State University Of Innovation,Science And Technology Omuma', zone: 'Zone F (Southeast)', state: 'Imo' },

  // EBONYI
  { institution: 'Ebonyi State University', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'Alex Ekwueme Federal University Ndufu Aleke Ikw', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'King David Federal University of Medical science,Uburu', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'Akanu Ibiam Federal Polytechnic, Unwana', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'Federal College of Agriculture, Ishiagu', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'Federal College of Education,Isu', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'Ebonyi State College of Education,IKWO', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
  { institution: 'Federal School of Forestry Ishiagu', zone: 'Zone F (Southeast)', state: 'Ebonyi' },
];

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