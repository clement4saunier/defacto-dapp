//
// ──────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: C U S T O M   E R R O R   C L A S S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────
//

export default class ExpressError extends Error {
  // ─── HTTP Response Status Code ───────────────────────────────────────────────

  statusCode: number

  // ─── Message Descibing The Error ─────────────────────────────────────────────

  statusMessage?: string

  constructor (statusCode: number = 500, statusMessage?: string, errorMessage?: string) {
    if (errorMessage !== undefined) super(errorMessage)
    else super()
    this.statusCode = statusCode
    if (statusMessage !== undefined) this.statusMessage = statusMessage
  }
}

// ─────────────────────────────────────────────────────────────────────────────
