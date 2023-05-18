import './Searchsidelinks.scss';

export default function SearchSidelinks({ productCountByGender, setgenderState, setisLoading, settotal}) {
  if (!productCountByGender) {
    return null; // Return null if productCountByGender is null or undefined
  }
  return (
    <ul className='searchside_links_index'>
      {Object.entries(productCountByGender).map(([gender, count]) => (
        <li key={gender} onClick={() => {setgenderState(gender); setisLoading(false);settotal(count)}}>
          {gender.charAt(0).toUpperCase() + gender.slice(1)} <div>{count}</div>
        </li>
      ))}
    </ul>
  );
}
