import React, { useEffect, useState } from "react";

import CardSmall from "./cardSmall";
import Button from "../../shared/sandbox/Button";
import { getFirebase } from "../../shared/firebase/config";
import DraftProjects from "./draftProjects";

import ProjectFilter from "../../pages/user/projectFilter";

import styles from "../../modules/projects.module.scss";

const getPublicPreview = async (uid, setPreviews) => {
    const previews = [];
    const preview = await getFirebase()
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("projectPreviews")
        .get();
    preview.forEach((doc) => {
        previews.push(doc.data());
    });
    setPreviews(previews);
};

function MyProjects(props) {
    const [previews, setPreviews] = useState([]);
	const [showDrafts, setShowDrafts] = useState(true);
	
	const hideDrafts = () => setShowDrafts(false)

    useEffect(() => {
        getPublicPreview(props.user.uid, setPreviews);
    }, [props.user.uid]);
    return (
        <div className={styles.root}>
            {/* <FindProjects view={props.view} /> */}
            {props.view === "edit" ? (
                <div className={styles.center}>
                    {showDrafts ? (
                        <DraftProjects hideDrafts={hideDrafts} />
                    ) : (
                        <Button
                            className={styles.add_project}
                            text="Add Project"
                            iconB="+"
                            onClick={() => setShowDrafts(true)}
                        />
                    )}
                </div>
            ) : (
                <>
                    <ProjectFilter skills={skills} tools={tools} />
                </>
            )}
            <div className={styles.project_section}>
                {props.view === "edit" && (
                    <h3 className={styles.section_title}>All Projects</h3>
                )}
                <div className={styles.flex_grid}>
                    {previews.map((preview, index) => {
                        return (
                            <CardSmall
                                key={index}
                                uid={props.user.uid}
                                preview={preview}
                                view={props.view}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default MyProjects;

const skills = ["sokeorjt", "qwjeiojwoer"];
const tools = ["sokeorjt", "qwjeiojwoer"];
