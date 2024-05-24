import styles from "../App.module.css";

const About = () => {
  return (
    <>
      <h1 className={styles.banner}>Forward Progress</h1>
      <div className={styles.aboutParagraphs}>
        <h3>
          Are you part of the ~80% quiet majority of Americans who are tired of
          the divisive extremes of the left and right?
        </h3>
        <h3>
          Instead of veering left or right, wouldn't you rather just move
          FORWARD?
        </h3>

        <h3 style={{ textAlign: "center" }}>JOIN US!!!</h3>
        <p>
          The rational voice of the middle majority is usually drowned out by
          the deafening screetches of these political polar edge-cases. You'll
          never make it on the typical partisan media outlet. You're views
          aren't extreme enough.
        </p>
        <p>
          To get the attention-based ratings the corporate owners and
          shareholders demand, you have to be one of the crazies that
          (literally) make the news. Only they can provide the compulsory toxic
          conversations; primed with irrational emotion, well-worn cliches, and
          shifted context.
        </p>
        <p>
          The problem is a systemic problem in the way negatives and division
          are incentivized. The idea here, is that technology can be used to
          circumvent this over time. This is just one piece of the puzzle:
          articles that avoid the extremes and focus on the middle majority.
        </p>
        <p>
          Being reasonable alone isn't going to make a change. Reason has to
          unite. Reason has to have a voice
        </p>
        <p>
          Someone has to yell "I LIKE <em>SOME</em> OF THIS BUT NOT <em>TOO</em>{" "}
          MUCH OF IT!"
        </p>
        <p>
          Someone has to yell "THINGS AREN'T REALLY <em>THAT</em> BAD, BUT THEY
          COULD <em>DEFINITELY</em> BE BETTER!"
        </p>
        <p>Someone has to yell "MOST OF US ARE SOMEWHAT IN THE MIDDLE!"</p>
      </div>
      {/* contact business email */}
    </>
  );
};

export default About;
