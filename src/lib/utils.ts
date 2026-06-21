import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return `D ${amount.toLocaleString('en-GM')}`
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return formatDate(date)
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    default: return 'bg-gray-100 text-gray-700'
  }
}

export function getJobTypeColor(type: string) {
  switch (type) {
    case 'full-time': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'part-time': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case 'contract': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    case 'internship': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400'
    case 'remote': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
    default: return 'bg-gray-100 text-gray-700'
  }
}

export function getApplicationStatusColor(status: string) {
  switch (status) {
    case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    case 'reviewing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'interview': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case 'offer': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    default: return 'bg-gray-100 text-gray-700'
  }
}

export const GAMBIA_CITIES = [
  'Banjul', 'Serrekunda', 'Kanifing', 'Brikama', 'Farafenni',
  'Basse', 'Lamin', 'Sukuta', 'Gunjur', 'Bakau'
]

export const GAMBIA_COMPANIES = [
  'GamTel', 'QCell', 'Africell', 'GIEPA', 'MRC Gambia',
  'Standard Chartered Gambia', 'Reliance Financial Services',
  'Gambia Revenue Authority', 'University of The Gambia',
  'Edward Francis Small Teaching Hospital'
]

export const CATEGORIES = [
  { id: '1', name: 'Technology', slug: 'technology', icon: '💻', color: 'blue' },
  { id: '2', name: 'Business', slug: 'business', icon: '📊', color: 'purple' },
  { id: '3', name: 'Agriculture', slug: 'agriculture', icon: '🌱', color: 'green' },
  { id: '4', name: 'Healthcare', slug: 'healthcare', icon: '🏥', color: 'red' },
  { id: '5', name: 'Trades', slug: 'trades', icon: '🔧', color: 'orange' },
  { id: '6', name: 'Languages', slug: 'languages', icon: '🗣️', color: 'yellow' },
  { id: '7', name: 'Finance', slug: 'finance', icon: '💰', color: 'teal' },
  { id: '8', name: 'Education', slug: 'education', icon: '📚', color: 'indigo' },
]
