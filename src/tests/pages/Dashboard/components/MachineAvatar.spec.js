import { Avatar } from "../../../../pages/Dashboard/components/MachineAvatar";


describe('Pages - MachineAvatar tests', () => {
    it('Avatar created successfully', () => {
        const props= {img: 'cvijet.jpg'}

        expect(Avatar(props)).toStrictEqual(<img alt="avatar_img" src="cvijet.jpg" />);
    })
})