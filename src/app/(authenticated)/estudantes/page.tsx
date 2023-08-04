"use client";
import { Button } from "@/components/ui/button";
import { connect } from "react-redux";

function StudentsPage() {
  return (
    <Button>Teste button</Button>
  );
}

const mapStateToProps = (state: any) => {
  return {
    accessToken: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {
})(StudentsPage);
