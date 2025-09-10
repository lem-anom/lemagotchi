

const Stat = ({s, text}) => {
    return (
        <h2 className="text-[#2F3E46] font-semibold px-2">{text}: {s}</h2>
    );

}
const Stats = ({ petName, sleep, hunger, boredom }) => {
  return (
    <div className="w-full flex flex-col bg-[#A7D397] p-4 space-y-2">
      <div className="text-[#2F3E46] text-2xl font-bold">
        {petName}
      </div>
      <div className="flex justify-between">
        <Stat text="sleep" s={sleep} />
        <Stat text="hunger" s={hunger} />
        <Stat text="boredom" s={boredom} />
      </div>
    </div>
  );
};

export default Stats;
