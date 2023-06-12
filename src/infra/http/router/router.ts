import { Router } from "express";
import { DB } from "../../database/firebase/db";
import { CreateUserFactory } from "../factories/create-user-controller.factory";
import { CreateVehicleFactory } from "../factories/create-vehicle-controller.factory";
import { LoginFactory } from "../factories/login-controller.factory";
import { LoadByVehicleFactory } from "../factories/load-by-vehicle-controller.factory";
import { LoadVehicleFactory } from "../factories/load-vehicle-controller.factory";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.get('/vehicle', async (req: any, res: any) => {
  const result = await LoadVehicleFactory(DB).handle();
  if (result.status >= 200 && result.status <= 299) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).json({
      error: result.data
    });
  }
});

router.get('/vehicle/search', async (req: any, res: any) => {
  const result = await LoadByVehicleFactory(DB).handle({ query: req.query });
  if (result.status >= 200 && result.status <= 299) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).json({
      error: result.data
    });
  }
});

router.post('/login', async (req: any, res: any) => {
  const result = await LoginFactory(DB).handle({ body: req.body });
  if (result.status >= 200 && result.status <= 299) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).json({
      error: result.data
    });
  }
});

router.post('/vehicle', authentication(DB), async (req: any, res: any) => {
  const result = await CreateVehicleFactory(DB).handle({ body: req.body });
  if (result.status >= 200 && result.status <= 299) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).json({
      error: result.data
    });
  }
});
  
router.post('/user', authentication(DB), async (req: any, res: any) => {
  const result = await CreateUserFactory(DB).handle({ body: req.body});
  if (result.status >= 200 && result.status <= 299) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).json({
      error: result.data
    });
  }
});

export default router;