/**
 * Utilitaires pour préparer les données pour iExec DataProtector
 * iExec ne supporte pas les arrays directement, il faut les convertir
 */

/**
 * Convertit récursivement tous les arrays en format compatible avec iExec
 * @param data - Données à convertir
 * @returns Données sans arrays
 */
export function sanitizeDataForIExec(data: any): any {
  if (Array.isArray(data)) {
    // Convertir l'array en objet indexé ou en string selon le contenu
    if (data.length === 0) {
      return { isEmpty: true, length: 0 }
    }
    
    // Si c'est un array de strings simples, les joindre
    if (data.every(item => typeof item === 'string')) {
      return {
        items: data.join(','),
        count: data.length,
        type: 'string_array'
      }
    }
    
    // Si c'est un array d'objets ou mixte, créer un objet indexé
    const indexed: any = {}
    data.forEach((item, index) => {
      indexed[`item_${index}`] = sanitizeDataForIExec(item)
    })
    indexed._metadata = {
      originalType: 'array',
      length: data.length
    }
    return indexed
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {}
    Object.keys(data).forEach(key => {
      sanitized[key] = sanitizeDataForIExec(data[key])
    })
    return sanitized
  }
  
  return data
}

/**
 * Reconvertit les données sanitizées vers leur format d'origine
 * @param data - Données sanitizées
 * @returns Données avec arrays restaurés
 */
export function restoreDataFromIExec(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  
  // Si c'est un string array converti
  if (data.type === 'string_array' && typeof data.items === 'string') {
    return data.items.split(',')
  }
  
  // Si c'est un array indexé avec métadonnées
  if (data._metadata?.originalType === 'array') {
    const array: any[] = []
    const length = data._metadata.length
    for (let i = 0; i < length; i++) {
      if (data[`item_${i}`] !== undefined) {
        array.push(restoreDataFromIExec(data[`item_${i}`]))
      }
    }
    return array
  }
  
  // Traiter récursivement les objets
  const restored: any = {}
  Object.keys(data).forEach(key => {
    if (key !== '_metadata') {
      restored[key] = restoreDataFromIExec(data[key])
    }
  })
  
  return restored
}

/**
 * Exemple d'utilisation :
 * 
 * const originalData = {
 *   categories: ['personal', 'financial', 'employment'],
 *   documents: [{name: 'doc1'}, {name: 'doc2'}],
 *   score: 85
 * }
 * 
 * // Avant protection avec iExec
 * const sanitized = sanitizeDataForIExec(originalData)
 * await protectDocumentData(sanitized, 'My Dataset')
 * 
 * // Après récupération depuis iExec
 * const restored = restoreDataFromIExec(sanitized)
 */
