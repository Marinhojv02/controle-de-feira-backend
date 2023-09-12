import { UserHouse } from "../model/UserHouse.Model";

interface IUserHouses {
    save(userHouse: UserHouse): Promise<UserHouse>;
    saveBulk(userHouse: UserHouse[]): Promise<UserHouse[]>;
    delete(userHouse: UserHouse): Promise<void>;
    retrieveByUserId(userHouseId: number): Promise<UserHouse[]>;
    retrieveByHouseId(userHouseId: number): Promise<UserHouse[]>;
    retrieveAll(): Promise<UserHouse[]>;
}

export class UserHousesRepo implements IUserHouses {
    
    async save(userHouse: UserHouse): Promise<UserHouse> {
      try {
          const created_user_house = await UserHouse.create({
            user_id: userHouse.user_id,
            house_id: userHouse.house_id,
          });
          return created_user_house;
      } catch (error) {
          throw new Error("Failed to create userHouse!");
      }
    }

    async saveBulk(userHouse: UserHouse[]): Promise<UserHouse[]> {
        try {
            const userHousesData = userHouse.map((item) => ({
                user_id: item.user_id,
                house_id: item.house_id,
            }))

            return await UserHouse.bulkCreate(userHousesData)
        } catch (error) {
            throw new Error("Failed to create userHouse!");
        }
      }

    async delete(userHouse: UserHouse): Promise<void> {
        try {
            const new_userHouse = await UserHouse.findOne({
                where: {
                    user_id: userHouse.user_id,
                    house_id: userHouse.house_id,
                },
            });
            if (!new_userHouse) {
                throw new Error("UserHouse not found!");
            }
            
            await new_userHouse.destroy();
        } catch (error) {
            throw new Error("Failed to delete userHouse!");
        }
    }
    
    async retrieveByUserId(userId: number): Promise<UserHouse[]> {
        try {
            const new_userHouse = await UserHouse.findAll({
                where: {
                    user_id: userId,
                },
            });
            if (!new_userHouse) {
                throw new Error("UserHouses not found!");
            }
            return new_userHouse;
        } catch (error) {
            throw new Error("Failed to retrieve userHouses!");
        }    
    }
    
    async retrieveByHouseId(houseId: number): Promise<UserHouse[]> {
        try {
            const new_userHouse = await UserHouse.findAll({
                where: {
                    house_id: houseId,
                },
            });
            if (!new_userHouse) {
                throw new Error("UserHouses not found!");
            }
            return new_userHouse;
        } catch (error) {
            throw new Error("Failed to retrieve userHouses!");
        }        
    }

    async retrieveAll(): Promise<UserHouse[]> {
        try {
            return await UserHouse.findAll();
        } catch (error) {
        throw new Error("Failed to retrieve userHouse!");
        }
    }
}