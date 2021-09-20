export default function useDateFormat() {
  const format = () => {
    const date = new Date()

    const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24)
  }

  return { format }
}
