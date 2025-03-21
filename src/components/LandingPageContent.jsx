import profileView from "../assets/profile-view.jpg";
import projectView from "../assets/project-view.jpg";
import graphView from "../assets/graph-view.jpg";

export default function LandingPageContent() {
  return (
    <div className="flex flex-col items-center gap-6 mt-6 md:[&_p]:max-w-96 text-start md:text-center md:w-full md:items-start md:max-w-[85rem]">
      <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 gap-6 md:flex-row">
        <img
          src={profileView}
          alt=""
          className="border-2 border-timberwolf rounded-sm max-h-60"
        />
        <p className="text-oxford-blue">
          <b>Profile Management View:</b> Manage your profile effortlessly,
          update user information, and access your projects in one intuitive
          dashboard. Quickly switch between projects and personalize your
          experience with ease.
        </p>
      </div>
      <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 gap-6 md:flex-row md:self-end">
        <p className="text-oxford-blue">
          <b>Project Overview - Kanban Board:</b> Stay organized with a Kanban
          board that gives you a clear overview of tasks within a project. Track
          progress across different stages, add new tasks, and manage their
          deadlines in a user-friendly and collaborative environment.
        </p>
        <img
          src={projectView}
          alt=""
          className="border-2 border-timberwolf rounded-sm max-h-60"
        />
      </div>
      <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 gap-6 md:flex-row">
        <img
          src={graphView}
          alt=""
          className="border-2 border-timberwolf rounded-sm max-h-60"
        />
        <p className="text-oxford-blue ">
          <b>Graph View - Milestones:</b> Visualize project milestones and
          dependencies in a dynamic graph format. Easily track your project's
          milestones, understand the relationships between them, and ensure
          timely completion of each stage of your project.
        </p>
      </div>
    </div>
  );
}
