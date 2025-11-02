export default function Cell({ value, onClick }) {
  return <td onClick={onClick}>{value}</td>;
}
