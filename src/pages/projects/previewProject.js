import React, { useState } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";

import Developer from "../../images/developer.svg";
import JobSearch from "../../images/jobsearch.png";
import Button from "../../shared/sandbox/Button";
import Carousel from "../../shared/sandbox/Carousel";
import TaskDnD from "../../shared/reactDnD/taskDnD";
import PDFPreview from "../../shared/sandbox/PDFPreview";
import SkillsTab from "./skillsTab"

import project from "../../modules/previewProject.module.scss";
import styles from "../../modules/createProject.module.scss";
import buttonStyle from "../../modules/_button.module.scss";
import dnd from "../../modules/DnD.module.scss";
import header from "../../modules/header.module.scss";

export function SectionGrid(props) {
    return (
        <div className={styles.section_grid}>
            <div className={styles.section_left}>
                <div className={styles.section_desc}>
                    {props.section.description}
                </div>
                {props.section.sectionLink.url ? (
                    <a
                        className={`${styles.section_link}`}
                        href={props.section.sectionLink.url}
                    >
                        <i className="fas fa-link" />
                        <div className={styles.link_text}>
                            {props.section.sectionLink.linkName}
                        </div>
                    </a>
                ) : (
                    ""
                )}
            </div>
            <div className={styles.section_right}>
                <div className={dnd.carousel_display}>
                    <Carousel files={props.section.files} />
                </div>
            </div>
        </div>
    );
}
export function SectionGridless(props) {
    return (
        <div className={styles.section_left}>
            <div className={styles.section_desc}>
                {props.section.description}
            </div>
            {props.section.sectionLink.url ? (
                <a
                    className={`${styles.section_link}`}
                    href={props.section.sectionLink.url}
                >
                    <i className="fas fa-link" />
                    <div className={styles.link_text}>
                        {props.section.sectionLink.linkName}
                    </div>
                </a>
            ) : (
                ""
            )}
            {props.section.files.type === "application/pdf" ? (
                <div className={styles.pdf_display}>
                    <PDFPreview file={props.section.files} preview />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

function PreviewProject(props) {
    const [overview, setOverview] = useState(true);
    // console.log(props);
    const situation = props.project.situation;
    const results = props.project.results;

    return (
        <div>
            <div
                className={`${styles.section_question} ${styles.section_input}`}
            >
                Your portfolio is ready to be published. Review your inputs and
                add a cover photo that captures the essence of your project!
                (optional)
            </div>
            <div className={project.cover_div}>
                <label
                    className={`${buttonStyle.cover_btn} ${buttonStyle.button} ${project.cover_button}`}
                >
                    <input type="file" onChange={props.editCover} />
                    <i className="fas fa-camera" style={{ marginRight: 5 }} />
                    Upload Cover
                </label>
                <img
                    src={
                        props.project.cover.img
                            ? props.project.cover.img
                            : JobSearch
                    }
                    alt="jobsearch"
                ></img>
    {console.log(props.project.cover)}
                <div className={project.banner}>
                    <div className={project.project_title}>
                        {props.project.title}
                    </div>
                    <div className={project.details}>
                        <i
                            className="far fa-calendar"
                            style={{ margin: "10px" }}
                        />
                        {`${situation.projectDates.startDate.format(
                            "MMM Do YYYY"
                        )} - ${situation.projectDates.endDate.format(
                            "MMM Do YYYY"
                        )}`}
                    </div>
                </div>
            </div>
            <div className={`${header.tabBottom}`}>
                <NavLink
                    activeClassName={header.activeProjectTab}
                    to="#"
                    isActive={() => overview}
                    className={header.projectTab}
                    onClick={() => setOverview(true)}
                >
                    Situation & Results
                </NavLink>

                <NavLink
                    activeClassName={header.activeProjectTab}
                    to="#"
                    isActive={() => !overview}
                    className={header.projectTab}
                    onClick={() => setOverview(false)}
                >
                    Tasks & Actions
                </NavLink>
            </div>
            <SkillsTab />
            {overview ? (
                <div className={project.project_ctn}>
                    <div className={project.project_section}>
                        <h1 className={project.h1}>Situation</h1>
                        <div className={project.situation_grid}>
                            <div className={project.summary_div}>
                                {situation.summary}
                            </div>
                            <div
                                className={`${project.stats_div} ${project.stats_text}`}
                            >
                                <div className={project.stats}>
                                    <div className={project.icon_text}>
                                        <i className="far fa-user" />
                                        <div className={project.left_margin}>
                                            Team Size
                                        </div>
                                    </div>
                                    <div className={project.details}>
                                        {situation.teamSize}
                                    </div>
                                </div>
                                <div className={project.stats}>
                                    <div className={project.icon_text}>
                                        <i className="fas fa-dollar-sign" />
                                        <div className={project.left_margin}>
                                            Budget
                                        </div>
                                    </div>
                                    <div className={project.details}>
                                        {situation.budget
                                            ? `${situation.budget} ${situation.currency.value}`
                                            : "No budget"}
                                    </div>
                                </div>
                                <div className={project.stats}>
                                    <div className={project.icon_text}>
                                        <i className="far fa-clock" />
                                        <div className={project.left_margin}>
                                            Duration
                                        </div>
                                    </div>
                                    <div className={project.details}>
                                        {moment
                                            .duration(
                                                situation.projectDates.endDate.diff(
                                                    situation.projectDates
                                                        .startDate
                                                )
                                            )
                                            .humanize({ d: 7, w: 4 })}
                                    </div>
                                </div>
                            </div>

                            <div className={project.user_div}>
                                <img
                                    src={JobSearch}
                                    alt="jobsearch"
                                    className={project.profile_pic}
                                ></img>
                                <div className={project.name}>{name}</div>
                                <div className={project.details}>
                                    {situation.role}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <h1 className={project.h1}>Tasks & Actions</h1> */}
                    <div className={project.project_section}>
                        <h1 className={project.h1}>Results</h1>
                        <div className={project.conclusion_grid}>
                            <div className={project.results_links}>
                                {results.links.length
                                    ? results.links.map((link, index) => (
                                          <a
                                              className={`${styles.section_link}`}
                                              href={link.url}
                                          >
                                              <i className="fas fa-link" />
                                              <div className={styles.link_text}>
                                                  {link.linkName}
                                              </div>
                                          </a>
                                      ))
                                    : ""}
                            </div>
                            <div className={project.conclusion}>
                                {results.conclusion}
                            </div>
                        </div>
                        {results.sections.length
                            ? results.sections.map((section, index) => (
                                  <div className={`${project.top_margin}`}>
                                      {section.files.length ? (
                                          <SectionGrid section={section} />
                                      ) : (
                                          <SectionGridless section={section} />
                                      )}
                                  </div>
                              ))
                            : ""}
                    </div>
                </div>
            ) : (
                <div className={project.project_ctn}>
                    <div className={project.project_section}>
                        <h1 className={project.h1}>Tasks & Actions</h1>
                        <TaskDnD data={props.project.tasks} readOnly />
                    </div>
                </div>
            )}
            <div
                className={`${project.center} ${project.top_margin} ${project.details}`}
            >
                End of preview
            </div>
            <div className={project.center}>
                <img
                    src={Developer}
                    alt="Developer"
                    className={project.preview_end}
                />
            </div>
            <div className={styles.button_footer}>
                <Button
                    iconL={<i className="fas fa-arrow-left" />}
                    text="Back"
                    onClick={props.prevStep}
                />
                <Button
                    className={styles.save_draft}
                    iconR={<i className="fas fa-flag" />}
                    text="Complete Project"
                    onClick={props.finishProject}
                />
            </div>
        </div>
    );
}

export default PreviewProject;

// const desc =
// 	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.';
// const size = '5';
// const budget = '100,000 AUD';
// const title = 'Tech Consultant';
// const date = '01/01/2011 - 20/02/2020';
// const projectTitle = "Project Title";
// const duration = "9 yrs 1 m";
const name = "John Doe";
