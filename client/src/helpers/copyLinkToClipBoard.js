export default function copyLinkToClipboard(showToast) {
  // GET CURRENT BROWSER URL
  const link = window.location.href;

  // WRITE IT TO THE CLIPBOARD
  navigator.clipboard
    .writeText(link)
    .then(() => showToast(undefined, "Copied", "success"));
}
