const b64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || ""
  sliceSize = sliceSize || 512
  let byteCharacters = atob(b64Data)
  let byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)
    let byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    let byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  let blob = new Blob(byteArrays, { type: contentType })
  return blob
}
const decodeJWT = token => {
  let base64Url, base64, payload, data
  if (token) {
    base64Url = token.split(".")[1]
    base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    payload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )
    data = JSON.parse(payload)
    return data
  }
}
export { b64toBlob, decodeJWT }
