import React from 'react'
import { useRecoilValue } from 'recoil';
import { authState } from '../atom/authAtom';
import { Navigate, Outlet } from 'react-router-dom';

export default function WorkspaceLayout() {
    let auth = useRecoilValue(authState);

    return (
      <div className="">
        {auth && auth?.role === "owner" ? (
          <div>
              <div className="w-full">
                <Outlet />
              </div>
          </div>
        ) : (
          <>
            <Navigate to="/signin" />
          </>
        )}
      </div>
    );
  }
  